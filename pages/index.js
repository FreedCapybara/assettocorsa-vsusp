import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import _ from 'lodash';

import { fileUtils } from '@lib/file-utils';
import { acUtils } from '@lib/ac-utils';
import { vsuspUtils } from '@lib/vsusp-utils';

import { FileDrop } from '@components/file-drop';
import { FilePicker } from '@components/file-picker';
import { FileStatus } from '@components/file-status';

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
    const newState = {
      ...this.state,
      dragging: false,
      files,
      fileError: false
    };

    const suspensionsIni = _.find(files, (f) => f.file.name === 'suspensions.ini');
    if (suspensionsIni) {
      const suspensionsIniText = await this.getFileText(suspensionsIni);
      const suspensionsIniData = acUtils.processSuspensionsIni(suspensionsIniText);
      newState.suspensionsIniData = suspensionsIniData;
    }

    const tyresIni = _.find(files, (f) => f.file.name === 'tyres.ini');
    if (tyresIni) {
      const tyresIniText = await this.getFileText(tyresIni);
      const tyresIniData = acUtils.processTyresIni(tyresIniText);
      newState.tyresIniData = tyresIniData;
    }

    const { suspensionsIniData, tyresIniData } = newState;
    if (suspensionsIniData && tyresIniData) {
      const vsuspUrl = this.createVsuspUrl(suspensionsIniData, tyresIniData);
      newState.vsuspUrl = vsuspUrl;
      window.open(vsuspUrl, '_blank');
    }

    this.setState(newState);
  };

  getFileText = async (fileData) => {
    if (!fileData) {
      return null;
    }

    const fileText = await fileUtils.readFileText(fileData.file);
    return fileText;
  };

  createVsuspUrl = (suspensionsIniData, tyresIniData) => {
    const frontSuspensionData = vsuspUtils.convertSuspensionData(suspensionsIniData.front, tyresIniData);
    const rearSuspensionData = vsuspUtils.convertSuspensionData(suspensionsIniData.rear, tyresIniData);

    const front = vsuspUtils.generateSuspension(frontSuspensionData);
    const rear = vsuspUtils.generateSuspension(rearSuspensionData);
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

          <div className={styles.card}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>
                Assetto Corsa&mdash;VSusp converter
              </h1>
              <p className={styles.description}>
                Convert Assetto Corsa suspension files to <a href="https://www.vsusp.com/" target="_blank" rel="noopener noreferrer">VSusp</a> geometries!<br />
                Drop your suspensions.ini and tyres.ini files here and you&apos;re good to go!<br />
                Use <a href="https://www.racedepartment.com/downloads/assetto-corsa-car-tuner.13946/" target="_blank" rel="noopener noreferrer">Assetto Corsa Car Tuner</a> to create suspension files.
              </p>
            </div>

            {this.state.fileError && (
              <p className={styles.warning}>
                This file type is not supported. Please choose another file.
              </p>
            )}

            <div className={styles.fileDropIndicator}>

              <span className={styles.fileDropIndicatorText}>
                Drag &amp; drop anywhere
              </span>

              <FileStatus
                fileName="suspensions.ini"
                isPresent={!!this.state.suspensionsIniData} />

              <FileStatus
                fileName="tyres.ini"
                isPresent={!!this.state.tyresIniData} />

              {!!this.state.vsuspUrl && (
                <a href={this.state.vsuspUrl} className={styles.vsuspLink} target="_blank" rel="noopener noreferrer">
                  Open in Vsusp &#x1f680;
                </a>
              )}

              <div className={styles.filePickerWrapper}>
                <FilePicker
                  label="Or browse files"
                  onChange={this.onFileSelected}
                  multiple />
              </div>
            </div>
          </div>
        </div>
      </FileDrop>
    );
  }
}

export default Home;

