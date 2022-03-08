import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import _ from 'lodash';

import { fileUtils } from '@lib/file-utils';
import { acUtils } from '@lib/ac-utils';
import { vsuspUtils } from '@lib/vsusp-utils';

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
      const vsuspUrl = this.createVsuspUrl(suspensionsIniData, tyresIniData);
      newState.vsuspUrl = vsuspUrl;
    }

    this.setState(newState);
  };

  processSuspensionsIni = async (suspensionsIni) => {
    if (!suspensionsIni) {
      return null;
    }

    let fileText = await fileUtils.readFileText(suspensionsIni.file);
    fileText = acUtils.stripComments(fileText);
    var result = acUtils.getWishboneSuspension(fileText);
    return result;
  };

  processTyresIni = async (tyresIni) => {
    if (!tyresIni) {
      return null;
    }

    let fileText = await fileUtils.readFileText(tyresIni.file);
    fileText = acUtils.stripComments(fileText);
    const result = acUtils.getTyres(fileText);
    return result;
  };

  createVsuspUrl = (suspensionsIniData, tyresIniData) => {
    const data = vsuspUtils.convertSuspensionData(suspensionsIniData, tyresIniData);

    const front = vsuspUtils.generateSuspension(data);
    const rear = front; // just duplicate the front for now
    const prefs = vsuspUtils.generatePrefs();

    const result = vsuspUtils.generateVsuspUrl(front, rear, prefs);
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

          <a target="_blank" rel="noopener noreferrer" href={this.state.vsuspUrl}>{this.state.vsuspUrl}</a>

        </div>
      </FileDrop>
    );
  }
}

export default Home;

