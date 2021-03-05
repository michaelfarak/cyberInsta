import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private postService: PostService, private sanitizer: DomSanitizer) { }

  showForm: boolean;
  private postForm: FormGroup;

  ngOnInit(): void {
    this.showForm = false;
    this.postForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      image: new FormControl(null, [Validators.required, this.requiredFileType('png')])
    });
  }

  toggleForm = () => {
    this.showForm = true;
  }

  requiredFileType = (type: string ) => {
    return (control: FormControl) => {
      const file = control.value;
      if (file) {
        const extension = file.name.split('.')[1].toLowerCase();
        if (type.toLowerCase() !== extension.toLowerCase()) {
          return {
            requiredFileType: true
          };
        }
        return null;
      }
      return null;
    };
  }


  onSubmit(): void {
    if (this.postForm.value.title && this.postForm.value.image) {
      this.postService.saveToLocalStorage(this.postForm.value).then(r => {
        this.postForm.reset();
        this.showForm = false;
        }
      );

    } else {
      window.alert('cannot post empty form');
    }
  }
}
