import { NewsService } from "api/NewsService";
import { URL_WEB } from "constants/constants";
import { Notification } from "../Notification/Notification";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        NewsService.uploadFile(file, res => {
          if (res.success) {
            resolve({
              default: `${URL_WEB}/${res.data.link}`
            })
          } else {
            Notification.error(res.message);
          }
        })
      }));
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export default MyCustomUploadAdapterPlugin;