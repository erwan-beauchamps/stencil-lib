import { Component, h, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'snack-bar',
  styleUrl: './snack-bar.css',
  shadow: true
})
export class SnackBarComponent {

    @Prop() sentence: string;
    @Prop() button: string;
    @Prop({reflect: true, mutable: true}) visible: boolean;

    hideSnack() {
        console.log('click')
        this.visible = false;
    }

    @Method()
    open() {
        this.visible = true;
    }

    render() {
        return (
        <div class='snack-container'>
            {this.sentence}
            <span class="close-button" onClick={this.hideSnack.bind(this)}>{this.button}</span>
        </div>
        );
    }
}
