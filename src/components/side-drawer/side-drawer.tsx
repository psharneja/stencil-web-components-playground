import { Component, h, Prop, State, Method } from "@stencil/core";

@Component({
    tag: 'my-side-drawer',
    styleUrl: './side-drawer.css',
    shadow:true
})

export class SideDrawer {
    @State() showContactInfo = false;
    @Prop({reflect: true}) titled: string;
    @Prop({reflect:true, mutable:true}) opened: boolean;

    onCloseDrawer() {
        this.opened = false;
    }

    onContentChange(content: string) {
        this.showContactInfo = content === 'contact';
        // this.showContactInfo = content === 'contact'? true : false;

    }

    @Method() async open() {
        this.opened = true;
    }

    render() {
        let mainContent = <slot/>
        if(this.showContactInfo) {

            mainContent = (
                <div id='contact-information'>
                <h2>contact Information</h2>
                <p>you can reach us at</p>
                <ul>
                    <li>phone: 9876545678</li>
                    <li>email: <a href="mailto:something@what.com">what@something.com</a></li>
                </ul>
            </div>
        )
    }
        let content = null;
        // if(this.open){
    content = ([
        <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}/>,
        <aside>
            <header><h1>{this.titled}</h1>
            <button onClick={this.onCloseDrawer.bind(this)}>x</button></header>
            <section id="tabs">

                <button class={this.showContactInfo? '': 'active'} onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
                <button class={this.showContactInfo? 'active': ''}  onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
            </section>
            <main>
                {mainContent}
            </main>
        </aside>
    ])
        // }
        return content
    }
}