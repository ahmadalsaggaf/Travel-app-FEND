import { handleSubmit } from './js/formHandler';
import { resUI } from './js/resUI';

import './styles/base.scss';
import './styles/form.scss';
import './styles/footer.scss';

document.getElementById('submit').addEventListener('click', handleSubmit);

alert('I EXIST BLA BLA');

export { handleSubmit };
export { resUI };
