import React from 'react';
import _ from 'lodash';

export class FileDrop extends React.Component {

  dropTargetRef = React.createRef();

  // adapted from https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929
  componentDidMount() {
    let dropTarget = this.dropTargetRef.current;
    dropTarget.addEventListener('dragenter', this.onDragEnter);
    dropTarget.addEventListener('dragleave', this.onDragLeave);
    dropTarget.addEventListener('dragover', this.onDragOver);
    dropTarget.addEventListener('drop', this.onDrop);
  }

  componentWillUnmount() {
    let dropTarget = this.dropTargetRef.current;
    dropTarget.removeEventListener('dragenter', this.onDragEnter);
    dropTarget.removeEventListener('dragleave', this.onDragLeave);
    dropTarget.removeEventListener('dragover', this.onDragOver);
    dropTarget.removeEventListener('drop', this.onDrop);
  }

  onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onDragEnter) {
      this.props.onDragEnter(e);
    }
  };

  onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onDragLeave) {
      this.props.onDragLeave(e);
    }
  };

  onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onDragOver) {
      this.props.onDragOver(e);
    }
  };

  onDrop = async (e) => {
    const { multiple, accept } = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onDrop) {
      this.props.onDrop(e);
    }

    let files = e.dataTransfer.files;
    if (files && files.length) {
      // only take the first file if multiple files aren't allowed
      if (!multiple) {
        files = [_.first(files)];
      }

      // check file types
      // https://stackoverflow.com/questions/20524306/check-selected-file-matches-accept-attribute-on-an-input-tag
      if (accept) {
        files = _.filter(files, (file) => accept.test(file.type));
      }

      // process the files
      const processedFiles = await this.readFiles(files);

      if (this.props.onChange) {
        this.props.onChange(processedFiles);
      }
    }
  };

  async readFiles(files) {
    const promises = [];
    for (const file of files) {
      const promise = new Promise((resolve) => {
        const fileClone = new File([file], file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result;
          const data = {
            file: fileClone,
            base64
          };
          resolve(data);
        };
        reader.readAsDataURL(fileClone);
      });
      promises.push(promise);
    }

    return await Promise.all(promises);
  }

  render() {

    return (
      <div ref={this.dropTargetRef}>
        {this.props.children}
      </div>
    );
  }
}

