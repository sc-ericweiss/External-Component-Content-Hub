import { createRoot } from 'react-dom/client';
import React from "react";
import UserInfo from './UserInfo';

declare global {

    interface Window  {PAGE_OPTIONS:any}
}

const OptionsContext = React.createContext<any>(null);

const onEntitySaved = (evt: Event): void => {
    const { definitionName, id } = (evt as CustomEvent<{ definitionName: string; id: number }>).detail;

    alert(`Entity with id ${id} and definition ${definitionName} was saved`);
};

window.addEventListener("ENTITY_SAVED", onEntitySaved);

const userName = window.PAGE_OPTIONS.userName

export default function createExternalRoot(container: HTMLElement) {
    const root = createRoot(container);
    
    return {
        render(context: any) {
                root.render(
                <OptionsContext.Provider value={context.options}>
                    <OptionsContext.Consumer>
                        {options => {
                            return (
                                <>
                                    <UserInfo client={context.client} name={userName}/>
                                    {/* We use a color from the theme and the entity id from the options */}
                                    <h2 style={{ color: context.theme.palette.primary.main }}>
                                        the entity id is, {options.entityId}!
                                    </h2>
                                    {/* We show a property from the config object */}
                                    <p>
                                        The following is information from the config object:<br/>
                                        {context.config.env.response}
                                        
                                       
                                    </p>
                                    <p style={{ color: "var(--color-cyan, 'red')" }}>
                                        The following text is styled in the cyan color based on the --color-cyan CSS
                                        variable
                                    </p>
                                </>
                            );
                        }}
                    </OptionsContext.Consumer>
                </OptionsContext.Provider>
                
            );
        },
        unmount() {
            window.removeEventListener("ENTITY_SAVED", onEntitySaved);
            root.unmount;
        },
    };
}
