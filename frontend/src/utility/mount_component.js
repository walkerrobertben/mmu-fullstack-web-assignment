import { createApp, withDirectives } from "vue";

import app_using from '../app_using';

const getMountedComponent = (component, onElement) => {

    //make onElement v-pre
    // onElement = withDirectives(onElement, ["v-pre"]);
    // console.log(onElement);
    
    const proxyElement = new Proxy(onElement, {
        set(_, prop, value) {
            if (prop == "el") {
                
                //create app and mount
                const subapp = createApp(component);
                app_using(subapp);
                subapp.mount(value);
            }
            return Reflect.set(...arguments);
        }
    });

    return proxyElement;
}

export default getMountedComponent;