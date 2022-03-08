import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import _ from 'lodash';

import { FileDrop } from '@components/file-drop';
import { FilePicker } from '@components/file-picker';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      files: [],
      fileError: false,
      suspensionsIniData: null,
      tyresIniData: null,
      vsuspUrl: null
    };
  }

  onDragOver = () => {
    this.setState({
      dragging: true
    });
    this.onDragLeaveDebounced.cancel();
  };

  onDragLeave = () => {
    this.setState({
      dragging: false
    });
  };

  onDragLeaveDebounced = _.debounce(this.onDragLeave, 10);

  onFileSelected = async (files) => {
    const suspensionsIni = _.find(files, (f) => f.file.name === 'suspensions.ini');
    const suspensionsIniData = await this.processSuspensionsIni(suspensionsIni);
    const tyresIni = _.find(files, (f) => f.file.name === 'tyres.ini');
    const tyresIniData = await this.processTyresIni(tyresIni);

    const newState = {
      dragging: false,
      files,
      fileError: false,
      suspensionsIniData,
      tyresIniData
    };

    if (suspensionsIniData && tyresIniData) {
      const vsuspUrl = this.generateVsuspUrl(suspensionsIniData, tyresIniData);
      newState.vsuspUrl = vsuspUrl;
    }

    this.setState(newState);
  };

  processSuspensionsIni = async (suspensionsIni) => {
    if (!suspensionsIni) {
      return null;
    }

    let fileText = await this.readFileText(suspensionsIni.file);

    // strip comments
    fileText = fileText.replaceAll(/\s*;.*/g, '');

    // track width
    const trackWidth = this.getValue(fileText, 'TRACK');

    // wheel offset
    const wheelOffset = this.getValue(fileText, 'RIM_OFFSET') || 0;

    // upper wishbone
    const topMount = this.getValue(fileText, 'WBCAR_TOP_REAR', { separator: ', ' });
    const topJoint = this.getValue(fileText, 'WBTYRE_TOP', { separator: ', ' });

    // lower wishbone
    const bottomMount = this.getValue(fileText, 'WBCAR_BOTTOM_FRONT', { separator: ', ' });
    const bottomJoint = this.getValue(fileText, 'WBTYRE_BOTTOM', { separator: ', ' });

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
  };

  processTyresIni = async (tyresIni) => {
    if (!tyresIni) {
      return null;
    }

    let fileText = await this.readFileText(tyresIni.file);

    // strip comments
    fileText = fileText.replaceAll(/\s*;.*/g, '');

    // tire width
    const tireWidth = this.getValue(fileText, 'WIDTH');

    // rolling radius
    const tireRadius = this.getValue(fileText, 'RADIUS');

    // rim radius
    const rimRadius = this.getValue(fileText, 'RIM_RADIUS');

    const result = {
      tireWidth,
      tireRadius,
      rimRadius
    };
    return result;
  };

  generateVsuspUrl = (suspensionsIniData, tyresIniData) => {
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
    const upperControlArmLength = upperMountX - upperBallJointX;//Math.sqrt(Math.pow(upperMountX - upperBallJointX, 2) + Math.pow(upperBallJointY - upperMountY, 2))
    const lowerControlArmLength = lowerMountX - lowerBallJointX;//Math.sqrt(Math.pow(lowerMountX - lowerBallJointX, 2) + Math.pow(lowerBallJointY - lowerMountY, 2))

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

    const parameters = [
      '0.8',
      'project_name:AC2Vsusp',
      'trim{body_roll_angle:0|front.left_bump:0|rear.left_bump:0|front.right_bump:0|rear.right_bump:0}'
    ];

    const front = [
      `frame.susp_type:${0}`,
      `frame.bottom_y:${this.vsuspNormalize(rideHeight)}`,
      `frame.center_to_upper_mount_x:${this.vsuspNormalize(frameCenterToUpperMountX)}`,
      `frame.bottom_to_upper_mount_y:${this.vsuspNormalize(frameBottomToUpperMountY)}`,
      `frame.center_to_lower_mount_x:${this.vsuspNormalize(frameCenterToLowerMountX)}`,
      `frame.bottom_to_lower_mount_y:${this.vsuspNormalize(frameBottomToLowerMountY)}`,
      `control_arms.upper_length:${this.vsuspNormalize(upperControlArmLength)}`,
      `control_arms.lower_length:${this.vsuspNormalize(lowerControlArmLength)}`,
      `knuckles.hub_to_upper_x:${this.vsuspNormalize(hubToUpperBallJointX)}`,
      `knuckles.hub_to_lower_x:${this.vsuspNormalize(hubToLowerBallJointX)}`,
      `knuckles.hub_to_lower_y:${this.vsuspNormalize(hubToLowerBallJointY)}`,
      `knuckles.hub_to_upper_y:${this.vsuspNormalize(hubToUpperBallJointY)}`,
      `knuckles.hub_to_strut_axis:${14000}`, // default!
      `knuckles.strut_incl:${8000}`, // default!
      `steering.active:${0}`, // default!
      `steering.hub_to_outer_tie_rod_x:${7620}`, // default!
      `steering.hub_to_outer_tie_rod_y:${7620}`, // default!
      `wheels.offset:${this.vsuspNormalize(wheelOffset)}`,
      `wheels.diameter:${1500}`, // default!
      `wheels.diameter_expl:${this.vsuspNormalize(wheelDiameter)}`,
      `tires.size_convention:1`,
      `tires.section_width:${this.vsuspNormalize(tireWidth)}`,
      `tires.aspect_ratio:${4500}`, // default!
      `tires.diameter_expl:${this.vsuspNormalize(tireOuterDiameter)}`,
      `tires.width_expl:${this.vsuspNormalize(tireWidth)}`,
      `tires.compression:0`
    ].join('|');
    parameters.push(`front{${front}}`);
    parameters.push(`rear{${front}}`); // just duplicate the front for now

    const pref = [
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
      `show.tl:0`,
      `show.kpil:0`,
      `redraw_during_drag:1`,
      `chart.x_axis_center:0`,
      `chart.x_axis_window:10`,
      `chart.x_axis_num_steps:21`,
      `chart.x_axis_field:trim.body_roll_angle`,
      `chart.y_axis_fields:[FR].general.roll_center.y`
    ].join('|');
    parameters.push(`pref{${pref}}`);

    const parametersResult = parameters.join('&');
    const result = `http://vsusp.com/?tool=2d#${encodeURIComponent(parametersResult)}`;
    return result;
  };

  readFileText = async (file) => {
    const promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        resolve(text);
      };
      reader.readAsText(file);
    });
    return await promise;
  };

  getValue = (text, key, options) => {
    let match = text.match(`${key}=.*`);
    if (!match) {
      return null;
    }
    match = match[0];

    const value = _.last(match.split('='));
    let result = +value;

    if (options) {
      if (options.separator) {
        result = value.split(options.separator);
        result = result.map((x) => +x);
      }
    }

    return result;
  };

  getString = (text, key, options) => {
    const match = text.match(`${key}=.*`)[0];
    if (!match) {
      return null;
    }

    const value = _.last(match.split('='));
    let result = value;

    if (options) {
      if (options.separator) {
        result = value.split(options.separator);
      }
    }

    return result;
  };

  vsuspNormalize = (value) => {
    return value * 100000; // AC 0.245 meters --> 24500
  };

  render() {
    const file = this.state.fileData && this.state.fileData.file || {};
    const files = this.state.files; // shortcut

    return (
      <FileDrop
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeaveDebounced}
        onChange={this.onFileSelected}
        multiple
      >
        <div className={styles.mainLayout}>

          {this.state.fileError && (
            <p className={styles.warning}>
              This file type is not supported. Please choose another file.
            </p>
          )}

          <div className={styles.fileDropIndicator}>
            <span className={styles.fileDropIndicatorText}>
              Drag &amp; drop anywhere
            </span>
            <FilePicker
              label="Choose files"
              onChange={this.onFileSelected}
              multiple />
          </div>

          <a target="_blank" rel="noopener noreferrer" href={this.state.vsuspUrl}>{this.state.vsuspUrl}</a>

        </div>
      </FileDrop>
    );
  }
}

export default Home;

