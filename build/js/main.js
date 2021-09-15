(function () {
  const REGULAR_EXPRESSION_PHONE =/^\+?[\d()\- ]+$/;
  const REGULAR_EXPRESSION_NAME =/^[A-Za-zА-Яа-яЁё]+$/;
  const MESSAGE_NAME ='Укажите ваше имя. Ввести данные можно на русском языке  и латиницей';
  const MESSAGE_PHONE ='Заполните номер вашего телефона. Номер должен содержать только цифры, пробелы, символы: - () +';

  const page = document.querySelector('.page-body');
  const navigationMain = document.querySelector('.main-navigation');
  const navigationToggle = navigationMain.querySelector('.main-navigation__toggle');
  const anchorsLinks = navigationMain.querySelectorAll('.main-navigation__list a[href*="#"]');

  const form = document.querySelector('.promo__form');
  const userInputPhone = form.querySelector('#tel');
  const userInputName = form.querySelector('#customer-name');

  /*======ОТКРЫТИЕ/ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ и ПЛАВНАЯ ПРОКРУТКА СТРАНИЦЫ ДО ЯКОРЯ============*/
  if (navigationMain) {

    navigationMain.classList.remove('main-navigation--nojs');

    const closeMenu = () => {
      navigationMain.classList.add('main-navigation--closed');
      navigationMain.classList.remove('main-navigation--opened');
      page.classList.remove('page-body__overflow');
    };

    const openMenu = () => {
      navigationMain.classList.remove('main-navigation--closed');
      navigationMain.classList.add('main-navigation--opened');
      page.classList.add('page-body__overflow');
    };

    navigationToggle.addEventListener('click', () => {
      if (navigationMain.classList.contains('main-navigation--closed')) {
        openMenu();
        return;
      }
      closeMenu();
    });

    anchorsLinks.forEach((anchorLink) => {
      anchorLink.addEventListener('click', (evt) => {
        evt.preventDefault();

        const blockId = anchorLink.getAttribute('href').substr(1);

        document.getElementById(blockId).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        if (navigationMain.classList.contains('main-navigation--opened')) {
          closeMenu();
        }
      });
    });

  }

  /*======ПРОВЕРКА LocalStorage============*/
  if (form) {

    let isStorageSupport = true;
    let storageTel = '';
    let storageName = '';

    try {
      storageTel = localStorage.getItem('tel');
      storageName = localStorage.getItem('name');

    } catch (err) {
      isStorageSupport = false;
    }

    if (storageName || storageTel) {
      userInputPhone.value = storageTel || '';
      userInputName.value = storageName || '' ;
    }

    form.addEventListener('submit', (evt)  => {
      if(!userInputPhone.value || !userInputName.value) {
        evt.preventDefault();

      }  else {
        if(isStorageSupport) {
          localStorage.setItem('tel',  userInputPhone.value);
          localStorage.setItem('name', userInputName.value);
        }
      }
    });
  }


  /*======ВАЛИДАЦИЯ ПОЛЯ ТЕЛЕФОН, ИМЯ============*/

  const checkInput= (inputText, message, regularExpression) => {
    if(!regularExpression.test(inputText.value)) {
      inputText.setCustomValidity(message);
    } else {
      inputText.setCustomValidity('');
    }
    inputText.reportValidity();
  };

  if (userInputPhone) {
    userInputPhone.addEventListener('input',(evt) => {
      checkInput(evt.target, MESSAGE_PHONE, REGULAR_EXPRESSION_PHONE);
    });
  }

  if (userInputName) {
    userInputName.addEventListener('input',(evt) => {
      checkInput(evt.target, MESSAGE_NAME, REGULAR_EXPRESSION_NAME);
    });
  }
})();
