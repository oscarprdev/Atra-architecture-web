export interface Data {
  home: Home;
  about: About;
  contact: Contact;
  projects: Project[];
}

export interface Home {
  title: string;
  subtitle: string;
  data: PersonalInfo;
}

export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  direction: string;
}

export interface Project {
  id: string;
  name: string;
  year: string;
  mainImage: string;
}

export interface ProjectDetail {
  id: string;
  name: string;
  year: number;
  mainImage: string;
  images: string[];
  description: string;
  top: boolean;
}

export interface ProjectGallery {
  id: string;
  name: string;
  year: string;
  mainImage: string;
  description: string;
  top: boolean;
}

export interface About {
  mainImage: string;
  description: string[];
}

export interface AboutInfo {
  text: string[];
  title: string;
  image: string;
}

export interface Contact {
  mainImage: string;
  form: ContactFormData;
  button: string;
}

export interface ContactFormData {
  name: string;
  surname: string;
  subject: string;
  email: string;
  content: string;
}
