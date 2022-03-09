
export const acUtils = {
  processSuspensionsIni,
  processTyresIni,
  stripComments,
  getFrontText,
  getRearText,
  getWishboneSuspension,
  getStrutSuspension,
  getTyres,
  getValue
};

function processSuspensionsIni(fileText) {
  if (!fileText) {
    return null;
  }

  const sanitized = acUtils.stripComments(fileText);

  const frontText = acUtils.getFrontText(sanitized);
  const rearText = acUtils.getRearText(sanitized);
  const frontSuspensionType = acUtils.getValue(frontText, 'TYPE');
  const rearSuspensionType = acUtils.getValue(rearText, 'TYPE');

  const result = {};

  // front suspension
  if (frontSuspensionType === 'DWB') {
    result.front = acUtils.getWishboneSuspension(frontText);
  } else if (frontSuspensionType === 'STRUT') {
    result.front = acUtils.getStrutSuspension(frontText);
  }

  // rear suspension
  if (rearSuspensionType === 'DWB') {
    result.rear = acUtils.getWishboneSuspension(rearText);
  } else if (rearSuspensionType === 'STRUT') {
    result.rear = acUtils.getStrutSuspension(rearText);
  }

  return result;
}

function processTyresIni(fileText) {
  if (!fileText) {
    return null;
  }

  const sanitized = acUtils.stripComments(fileText);

  const result = acUtils.getTyres(sanitized);
  return result;
}

function stripComments(fileText) {
  var result = fileText.replaceAll(/\s*;.*/g, '');
  return result;
}

function getFrontText(fileText) {
  const match = fileText.match(/\[FRONT\][\s\S]*?[\r\n][\r\n]/m);
  return match[0];
}

function getRearText(fileText) {
  const match = fileText.match(/\[REAR\][\s\S]*?[\r\n][\r\n]/m);
  return match[0];
}

function getWishboneSuspension(text) {
  // track width
  const trackWidth = acUtils.getValue(text, 'TRACK');

  // wheel offset
  const wheelOffset = acUtils.getValue(text, 'RIM_OFFSET') || 0;

  // upper wishbone
  const topMount = acUtils.getValue(text, 'WBCAR_TOP_FRONT', { separator: ', ' });
  const topJoint = acUtils.getValue(text, 'WBTYRE_TOP', { separator: ', ' });

  // lower wishbone
  const bottomMount = acUtils.getValue(text, 'WBCAR_BOTTOM_FRONT', { separator: ', ' });
  const bottomJoint = acUtils.getValue(text, 'WBTYRE_BOTTOM', { separator: ', ' });

  const result = {
    type: 'DWB',
    trackWidth,
    wheelOffset,
    upperMountX: topMount[0],
    upperMountY: topMount[1],
    upperBallJointX: topJoint[0],
    upperBallJointY: topJoint[1],
    lowerMountX: bottomMount[0],
    lowerMountY: bottomMount[1],
    lowerBallJointX: bottomJoint[0],
    lowerBallJointY: bottomJoint[1]
  };
  return result;
}

function getStrutSuspension(text) {
  // track width
  const trackWidth = acUtils.getValue(text, 'TRACK');

  // wheel offset
  const wheelOffset = acUtils.getValue(text, 'RIM_OFFSET') || 0;

  // strut
  const strutTop = acUtils.getValue(text, 'STRUT_CAR', { separator: ', ' });
  const strutBottom = acUtils.getValue(text, 'STRUT_TYRE', { separator: ', ' });

  // lower wishbone
  const bottomMount = acUtils.getValue(text, 'WBCAR_BOTTOM_FRONT', { separator: ', ' });
  const bottomJoint = acUtils.getValue(text, 'WBTYRE_BOTTOM', { separator: ', ' });

  const result = {
    type: 'STRUT',
    trackWidth,
    wheelOffset,
    strutUpperMountX: strutTop[0],
    strutUpperMountY: strutTop[1],
    strutLowerMountX: strutBottom[0],
    strutLowerMountY: strutBottom[1],
    lowerMountX: bottomMount[0],
    lowerMountY: bottomMount[1],
    lowerBallJointX: bottomJoint[0],
    lowerBallJointY: bottomJoint[1]
  };
  return result;
}

function getTyres(text) {
  // tire width
  const tireWidth = acUtils.getValue(text, 'WIDTH');

  // rolling radius
  const tireRadius = acUtils.getValue(text, 'RADIUS');

  // rim radius
  const rimRadius = acUtils.getValue(text, 'RIM_RADIUS');

  const result = {
    tireWidth,
    tireRadius,
    rimRadius
  };
  return result;
}

function getValue(text, key, options) {
  let match = text.match(`${key}=.*`);
  if (!match) {
    return null;
  }
  match = match[0];

  const value = _.last(match.split('='));
  let result = isNaN(value) ? value : +value;

  if (options) {
    if (options.separator) {
      result = value.split(options.separator);
      result = result.map((x) => isNaN(x) ? x : +x);
    }
  }

  return result;
}

