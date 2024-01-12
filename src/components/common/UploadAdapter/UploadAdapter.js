class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        console.log(1111, file);
        resolve({
          default: 'https://cdn.24h.com.vn/upload/1-2024/images/2024-01-12//1705048762-581-thumbnail-width740height495_anh_cat_3_2.jpg'
        })
        // const toBase64 = file => new Promise((resolve, reject) => {
        //   const reader = new FileReader();
        //   reader.readAsDataURL(file);
        //   reader.onload = () => resolve(reader.result);
        //   reader.onerror = error => reject(error);
        // });

        // return toBase64(file).then(cFile => {
        //   return Fetch("admin/uploadimage", {
        //     imageBinary: cFile
        //   }).then((d) => {
        //     if (d.status) {
        //       this.loader.uploaded = true;
        //       resolve({
        //         default: d.response.url
        //       });
        //     } else {
        //       reject(`Couldn't upload file: ${file.name}.`)
        //     }
        //   });
        // })
      }));
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export default MyCustomUploadAdapterPlugin;