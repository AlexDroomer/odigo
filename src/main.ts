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
    const dialogElement =
      document.querySelector<HTMLDialogElement>('#sendRequestDialog')!;
    dialogElement.showModal();
  },
  closeModal() {
    const dialogElement =
      document.querySelector<HTMLDialogElement>('#sendRequestDialog')!;
    dialogElement.close();
  },
};

Alpine.store('features', featuresStore);

Alpine.start();

function findVideos() {
  let videos: NodeListOf<HTMLVideoElement> =
    document.querySelectorAll('.video');

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

function setupVideo(video: HTMLVideoElement) {
  let link: HTMLLinkElement = video.querySelector('.video__link')!;
  let media: HTMLImageElement = video.querySelector('.video__media')!;
  let button: HTMLButtonElement = video.querySelector('.video__button')!;
  let id = parseMediaURL(media);

  video.addEventListener('click', () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(media: HTMLImageElement) {
  let regexp =
    /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
  let url = media.src;
  let match = url.match(regexp)!;

  return match[1];
}

function createIframe(id: string) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
}

function generateURL(id: string) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();
