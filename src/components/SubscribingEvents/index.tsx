import ReactDOM from "react-dom";
import React from "react";

const OptionsContext = React.createContext<any>(null);

const onEntitySaved = (evt: Event): void => {
    const { definitionName, id } = (evt as CustomEvent<{ definitionName: string; id: number }>).detail;

    alert(`Entity with id ${id} and definition ${definitionName} was saved`);
};
window.addEventListener("ENTITY_SAVED", onEntitySaved);

export default function createExternalRoot(container: HTMLElement) {
    return {
        render(context: any) {
            ReactDOM.render(
                <OptionsContext.Provider value={context.options}>
                    <OptionsContext.Consumer>
                        {options => {
                            return (
                                <>
                                    {/* We use a color from the theme and the entity id from the options */}
                                    <h2 style={{ color: context.theme.palette.primary.main }}>
                                        the entity id is, {options.entityId}!
                                    </h2>
                                    {/* We show a property from the config object */}
                                    <p>
                                        The following is information from the config object:
                                        {context.config.propFromConfig}
                                    </p>
                                    <p style={{ color: "var(--color-cyan, 'red')" }}>
                                        The following text is styled in the cyan color based on the --color-cyan CSS
                                        variable
                                    </p>
                                </>
                            );
                        }}
                    </OptionsContext.Consumer>
                </OptionsContext.Provider>,
                container
            );
        },
        unmount() {
            window.removeEventListener("ENTITY_SAVED", onEntitySaved);
            ReactDOM.unmountComponentAtNode(container);
        },
    };
}