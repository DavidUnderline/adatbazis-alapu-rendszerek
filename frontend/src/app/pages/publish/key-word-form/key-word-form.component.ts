import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-key-word-form',
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './key-word-form.component.html',
  styleUrl: './key-word-form.component.css'
})
export class KeyWordFormComponent {
  key_word_number = 0
  key_words : string[] = []

  key_word_form = new FormControl<string>('', {nonNullable: true})
  @Output() final_key_words = new EventEmitter<string[]>();
  add(key_word: string){
    if(!key_word){
      return;
    }
    if (this.key_words.find(existingKeyWord => existingKeyWord === key_word)){
      //todo visszaigazolás arról, hogy kétszer ugyan azt nem lehet feltölteni
      return;
    }
    this.key_words.push(key_word)
    this.key_word_form.reset()

    this.final_key_words.emit(this.key_words)
  }

  delete(index: number){
    this.key_words.splice(index, 1)
    this.final_key_words.emit(this.key_words)
  }
}
