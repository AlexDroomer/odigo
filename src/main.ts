import 'normalize.css';
import './styles.scss';
import Alpine, { AlpineComponent } from 'alpinejs';

window.Alpine = Alpine;

type FeaturesStore = AlpineComponent<{
  on: boolean;
  categories: { name: string; link: string }[];
  handleHeader: () => void;
  toggleMenu: () => void;
  handleSmoothScroll: (link: string) => void;
}>;

const featuresStore = {
  on: false,
  userInputPlace: '',
  userInputAction: '',
  categories: [
    { name: 'Articles', link: '#articles' },
    { name: 'Locations', link: '#locations' },
    { name: 'Videos', link: '#videos' },
    { name: 'Sign In', link: '#sign-in' },
  ],
  handleHeader() {
    const header = document.querySelector<HTMLElement>('.header')!;
    if (window.scrollY > 125) {
      header.classList.add('header_active');
    }
    if (window.scrollY < 125) {
      header.classList.remove('header_active');
    }
  },

  toggleMenu(this: FeaturesStore) {
    this.on = !this.on;
  },
  handleSmoothScroll(this: FeaturesStore, link: string) {
    if (window.innerWidth <= 767) {
      this.toggleMenu();
    }
    const element = document.querySelector<HTMLElement>(link)!;
    element.scrollIntoView({ behavior: 'smooth' });
  },
  sendRequest(form: HTMLFormElement) {
    const data = new FormData(form);

    for (let [key, value] of data) {
      console.log(`${key} - ${value}`);
    }
  },
  openModal() {
    const dialogElement = document.querySelector<HTMLDialogElement>('#sendRequestDialog')!
    dialogElement.showModal()
  },
  closeModal() {
    const dialogElement = document.querySelector<HTMLDialogElement>('#sendRequestDialog')!
    dialogElement.close()
  }
};

Alpine.store('features', featuresStore);

Alpine.start();
