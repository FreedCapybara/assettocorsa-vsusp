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

    // upper wishbone
    const topFront = this.getValue(fileText, 'WBCAR_TOP_FRONT', { separator: ', ' });
    const topRear = this.getValue(fileText, 'WBCAR_TOP_REAR', { separator: ', ' });
    const topJoint = this.getValue(fileText, 'WBTYRE_TOP', { separator: ', ' });

    // lower wishbone
    const bottomFront = this.getValue(fileText, 'WBCAR_BOTTOM_FRONT', { separator: ', ' });
    const bottomRear = this.getValue(fileText, 'WBCAR_BOTTOM_FRONT', { separator: ', ' });
    const bottomJoint = this.getValue(fileText, 'WBTYRE_BOTTOM', { separator: ', ' });

    // frame
    // ----------------
    // suspension type --> double wishbone
    // ride height --> rolling radius - lower wishbone Y
    // frame center to lower mount X --> (track width / 2) - lower wishbone front mount X
    // frame bottom to lower mount Y --> 0
    // frame center to upper mount X --> (track width / 2) - upper wishbone front mount X
    // frame bottom to upper mount Y --> upper wishbone front mount Y - lower wishbone front mount Y

    // control arms
    // ----------------
    // upper control arm length --> sqrt((upper joint X - top front mount X)^2 + (upper joint Y - top front mount Y)^2)
    // lower control arm length --> sqrt((lower joint X - bottom front mount X)^2 + (lower joint Y - bottom front mount Y)^2)

    // steering knuckles
    // ----------------
    // hub to upper ball joint X --> upper joint X + wheel offset
    // hub to upper ball joint Y --> Math.abs(upper joint Y)
    // hub to lower ball joint X --> lower joint X + wheel offset
    // hub to lower ball joint Y --> Math.abs(lower joint Y)

    // wheels/tires
    // ----------------
    // sizing convention --> explicit
    // tire outer diameter --> tire radius * 2
    // tire width --> tire width
    // wheel diameter --> rim radius * 2
  };

  processTyresIni = async (tyresIni) => {
    if (!tyresIni) {
      return null;
    }

    let fileText = await this.readFileText(tyresIni.file);

    // strip comments
    fileText = fileText.replaceAll(/\s*;.*/g, '');
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
    const match = text.match(`${key}=.*`)[0];
    if (!match) {
      return null;
    }

    const value = _.last(match.split('='));
    let result = +value;

    if (options.separator) {
      result = value.split(options.separator);
      result = result.map((x) => +x);
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

    if (options.separator) {
      result = value.split(options.separator);
    }

    return result;
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

        </div>
      </FileDrop>
    );
  }
}

export default Home;

