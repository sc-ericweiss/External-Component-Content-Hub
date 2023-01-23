
export default function createExternalRoot(rootElement: HTMLElement) {
    return {
        render(props: any) {
            rootElement.innerHTML = "Hello World"
        },
        unmount() {
            rootElement.innerHTML = ""
        }
    }

}