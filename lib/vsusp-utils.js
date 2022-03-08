
export const vsuspUtils = {
  convertSuspensionData,
  generateSuspension,
  generatePrefs,
  generateVsuspUrl,
  normalize
};

function convertSuspensionData(suspensionsIniData, tyresIniData) {
  const { trackWidth, wheelOffset, upperMountX, upperMountY, upperBallJointX, upperBallJointY, lowerMountX, lowerMountY, lowerBallJointX, lowerBallJointY } = suspensionsIniData;
  const { tireWidth, tireRadius, rimRadius } = tyresIniData;

  // frame
  // ----------------
  // suspension type --> double wishbone
  // ride height --> rolling radius + lower wishbone Y
  // frame center to lower mount X --> (track width / 2) - lower wishbone front mount X
  // frame bottom to lower mount Y --> 0
  // frame center to upper mount X --> (track width / 2) - upper wishbone front mount X
  // frame bottom to upper mount Y --> upper wishbone front mount Y - lower wishbone front mount Y
  const rideHeight = tireRadius + lowerMountY;
  const frameCenterToLowerMountX = (trackWidth / 2) - lowerMountX;
  const frameBottomToLowerMountY = 0;
  const frameCenterToUpperMountX = (trackWidth / 2) - upperMountX;
  const frameBottomToUpperMountY = upperMountY - lowerMountY;

  // control arms
  // ----------------
  // upper control arm length --> sqrt((upper joint X - top front mount X)^2 + (upper joint Y - top front mount Y)^2)
  // lower control arm length --> sqrt((lower joint X - bottom front mount X)^2 + (lower joint Y - bottom front mount Y)^2)
  const upperControlArmLength = Math.sqrt(Math.pow(upperMountX - upperBallJointX, 2) + Math.pow(upperBallJointY - upperMountY, 2))
  const lowerControlArmLength = Math.sqrt(Math.pow(lowerMountX - lowerBallJointX, 2) + Math.pow(lowerBallJointY - lowerMountY, 2))

  // steering knuckles
  // ----------------
  // hub to upper ball joint X --> upper joint X + wheel offset
  // hub to upper ball joint Y --> Math.abs(upper joint Y)
  // hub to lower ball joint X --> lower joint X + wheel offset
  // hub to lower ball joint Y --> Math.abs(lower joint Y)
  const hubToUpperBallJointX = upperBallJointX + wheelOffset;
  const hubToUpperBallJointY = Math.abs(upperBallJointY);
  const hubToLowerBallJointX = lowerBallJointX + wheelOffset;
  const hubToLowerBallJointY = Math.abs(lowerBallJointY);

  // wheels/tires
  // ----------------
  // wheel offset --> wheel offset
  // sizing convention --> explicit
  // tire outer diameter --> tire radius * 2
  // tire width --> tire width
  // wheel diameter --> rim radius * 2
  const tireOuterDiameter = tireRadius * 2;
  const wheelDiameter = (rimRadius * 2) - .0254;

  const result = {
    rideHeight,
    frameCenterToLowerMountX,
    frameBottomToLowerMountY,
    frameCenterToUpperMountX,
    frameBottomToUpperMountY,
    upperControlArmLength,
    lowerControlArmLength,
    hubToUpperBallJointX,
    hubToUpperBallJointY,
    hubToLowerBallJointX,
    hubToLowerBallJointY,
    wheelOffset,
    tireOuterDiameter,
    tireWidth,
    wheelDiameter
  };
  return result;
}

function generateSuspension(data) {
  const {
    rideHeight,
    frameCenterToLowerMountX,
    frameBottomToLowerMountY,
    frameCenterToUpperMountX,
    frameBottomToUpperMountY,
    upperControlArmLength,
    lowerControlArmLength,
    hubToUpperBallJointX,
    hubToUpperBallJointY,
    hubToLowerBallJointX,
    hubToLowerBallJointY,
    wheelOffset,
    tireOuterDiameter,
    tireWidth,
    wheelDiameter
  } = data;

  const suspension = [
    `frame.susp_type:${0}`,
    `frame.bottom_y:${normalize(rideHeight)}`,
    `frame.center_to_upper_mount_x:${normalize(frameCenterToUpperMountX)}`,
    `frame.bottom_to_upper_mount_y:${normalize(frameBottomToUpperMountY)}`,
    `frame.center_to_lower_mount_x:${normalize(frameCenterToLowerMountX)}`,
    `frame.bottom_to_lower_mount_y:${normalize(frameBottomToLowerMountY)}`,
    `control_arms.upper_length:${normalize(upperControlArmLength)}`,
    `control_arms.lower_length:${normalize(lowerControlArmLength)}`,
    `knuckles.hub_to_upper_x:${normalize(hubToUpperBallJointX)}`,
    `knuckles.hub_to_lower_x:${normalize(hubToLowerBallJointX)}`,
    `knuckles.hub_to_lower_y:${normalize(hubToLowerBallJointY)}`,
    `knuckles.hub_to_upper_y:${normalize(hubToUpperBallJointY)}`,
    `knuckles.hub_to_strut_axis:${14000}`, // default!
    `knuckles.strut_incl:${8000}`, // default!
    `steering.active:${0}`, // default!
    `steering.hub_to_outer_tie_rod_x:${7620}`, // default!
    `steering.hub_to_outer_tie_rod_y:${7620}`, // default!
    `wheels.offset:${normalize(wheelOffset)}`,
    `wheels.diameter:${1500}`, // default!
    `wheels.diameter_expl:${normalize(wheelDiameter)}`,
    `tires.size_convention:1`,
    `tires.section_width:${normalize(tireWidth)}`,
    `tires.aspect_ratio:${4500}`, // default!
    `tires.diameter_expl:${normalize(tireOuterDiameter)}`,
    `tires.width_expl:${normalize(tireWidth)}`,
    `tires.compression:0`
  ];

  const result = suspension.join('|');
  return result;
}

function generatePrefs(data) {
  const prefs = [
    `diag1.px_per_mm:200`,
    `diag1.front_or_rear:front`,
    `tab.active:3`,
    `units:1`,
    `show.f:1`,
    `show.ca:1`,
    `show.k:1`,
    `show.st:1`,
    `show.stl:1`,
    `show.w:1`,
    `show.t:1`,
    `show.rc:1`,
    `show.rcl:1`,
    `show.ic:1`,
    `show.icl:1`,
    `show.fvsa:0`,
    `show.tl:1`,
    `show.kpil:1`,
    `redraw_during_drag:1`,
    `chart.x_axis_center:0`,
    `chart.x_axis_window:10`,
    `chart.x_axis_num_steps:21`,
    `chart.x_axis_field:trim.body_roll_angle`,
    `chart.y_axis_fields:[FR].general.roll_center.y`
  ];

  const result = prefs.join('|');
  return result;
}

function generateVsuspUrl(front, rear, prefs) {
  const parameters = [
    '0.8',
    'project_name:AC2Vsusp',
    'trim{body_roll_angle:0|front.left_bump:0|rear.left_bump:0|front.right_bump:0|rear.right_bump:0}'
  ];

  parameters.push(`front{${front}}`);
  parameters.push(`rear{${rear}}`); // just duplicate the front for now
  parameters.push(`pref{${prefs}}`);

  const result = `http://vsusp.com/?tool=2d#${encodeURIComponent(parameters.join('&'))}`;
  return result;
}

function normalize(value) {
  return value * 100000; // AC 0.245 meters --> vsusp 24500
}

