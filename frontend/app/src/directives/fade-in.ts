import { DirectiveBinding } from 'vue';

const fadeInDirective = {
    mounted(el: HTMLElement, _: DirectiveBinding) {
        console.log(el);
        const options = { threshold: 0.2 };
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                el.classList.add('fade-in');
                observer.disconnect();
            }
        }, options);
        observer.observe(el);
    }
};

export default fadeInDirective;
