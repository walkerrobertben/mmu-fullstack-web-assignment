import { createApp } from "vue";

import app_using from '../app_using';

const MountComponent = (component, onElement) => {
    const subapp = createApp(component);
    
    app_using(subapp);
    
    const proxyElement = new Proxy(onElement, {
        set(target, prop, value) {
            if (prop == "el") {
                subapp.mount(value);
            }
            return Reflect.set(...arguments);
        }
    });

    return proxyElement;
}

export default MountComponent;