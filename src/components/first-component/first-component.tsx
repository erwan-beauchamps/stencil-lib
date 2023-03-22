import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'first-component',
  styleUrl: './first-component.css',
  shadow: true
})
export class FirstComponent {

  @Prop({reflect: true}) sentence: string;

  render() {
    return <div>
        <div class="first-div">
            {this.sentence}
            <span></span>
        </div>
        <div class="first-slot">
            <slot />
        </div>
    </div>;
  }
}
