import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

const STORAGE_KEY = 'local_postsList'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  initID = 0;
  currentID;
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public saveToLocalStorage = async postForm => {
    const currentPostsList = this.storage.get(STORAGE_KEY) || [];
    if (!currentPostsList.length) {
      this.currentID = 0;
    } else {
      this.currentID = currentPostsList.length;
    }
    currentPostsList.push({
      id: this.currentID,
      title: postForm.title,
      image: await this.toBase64(postForm.image),
      isLiked: false
    });
    this.storage.set(STORAGE_KEY, currentPostsList);
    window.alert('Your post has been submitted');
  };

  public getPostsList = () => this.storage.get(STORAGE_KEY);

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
