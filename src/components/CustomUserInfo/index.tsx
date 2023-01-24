import React from "react";
import  ReactDOM  from "react-dom";
import UserId from "./UserId";

/*
PAGE_OPTIONS will be deprecated in future versions.  IF you need specifc PAGE_OPTIONS functionality passed into the render context object, 
please put in a feature request to have those specific options available with service support ticket request. 
*/
declare global{
    interface Window {PAGE_OPTIONS:any}
}

const userName = window.PAGE_OPTIONS.userName


export default function createExternalRoot(container:HTMLElement){
    return {
       render(context:any){
            ReactDOM.render(
                <>
                    <p>Hello {userName}! Your user id is: <UserId client={context.client} name={userName}/> </p>
                </>,
            container
        )
       }, 
       unmount() {
        ReactDOM.unmountComponentAtNode(container)
       }
        
    }   
}