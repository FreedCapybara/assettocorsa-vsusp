
export const acUtils = {
  stripComments,
  getFrontText,
  getRearText,
  getWishboneSuspension,
  getStrutSuspension,
  getTyres,
  getValue
};

function stripComments(fileText) {
  var result = fileText.replaceAll(/\s*;.*/g, '');
  return result;
}

function getFrontText(fileText) {
}

function getRearText(fileText) {
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

