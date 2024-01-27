export class Modal {
    private readonly id: string;

    //static field
    public static modals: any[] = [];

    constructor(id = null) {

        const findModal = Modal.modals.find(el => el.id === id);
        if (findModal) {
            Modal.removeById(id);
        }

        Modal.modals.push(this);
        console.log(Modal.modals);
        this.id = id || (Math.random() + Modal.modals.length);
    };

    public open(template: string): void {
        //chek if element exists in dom
        const divWrap = document.createElement("div");
        divWrap.innerHTML = template;
        divWrap.id = this.id;
        divWrap.setAttribute("modal-id", this.id);
        divWrap.classList.add("modal-element");
        document.body.appendChild(divWrap);
    };

    public remove(): void {
        const modalEl = document.getElementById(this.id);
        modalEl.parentNode.removeChild(modalEl);
    };

    public static removeById(id: string = null): void {
        let modalId = id;

        //remove modal from array of active modals
        const findEl = Modal.modals.find(el => el.id === modalId);
        if (findEl) {
            findEl.remove();
            Modal.modals = Modal.modals.filter(el => el.id !== modalId);
        } else {
            if (Array.isArray(Modal.modals)) {
                const lastEl = Modal.modals.pop();
                if (lastEl) {
                    lastEl.remove();
                }
            }
        }
    };

    public static removeAll(): void {
        if (Array.isArray(Modal.modals)) {
            Modal.modals.forEach(el => Modal.removeById(el.id));
        }
    };

}