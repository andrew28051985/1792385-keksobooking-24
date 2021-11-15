const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PHOTO_WHIDTH = '40';
const PHOTO_HEIGHT = '40';

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file');
const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const previewPhoto = document.querySelector('.ad-form__photo');
const formPhotoContainer = document.querySelector('.ad-form__photo-container');

const blockPositionCenter = (block) => {
  block.style.display = 'flex';
  block.style.justifyContent = 'center';
  block.style.alignItems = 'center';
};

const createContainerPhoto = (container) => {
  const blockDiv = document.createElement('div');
  blockPositionCenter(blockDiv);
  blockDiv.classList.add('ad-form__photo');
  container.append(blockDiv);
  return blockDiv;
};

const createPhoto = (container) => {
  const photo = document.createElement('img');
  photo.width = PHOTO_WHIDTH;
  photo.height = PHOTO_HEIGHT;
  container.append(photo);
  return photo;
};

const clearPhoto = () => {
  previewAvatar.src = 'img/muffin-grey.svg';
  previewPhoto.style = '';
  previewPhoto.textContent = '';
  const collects = formPhotoContainer.querySelectorAll('.ad-form__photo');
  for (let i = 1; i < collects.length; i++) {
    if (i >= 1) {
      collects[i].remove();
    }
  }
};

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    const endsName = fileName.endsWith(it);
    return endsName;
  });

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

fileChooserPhoto.addEventListener('change', () => {
  const filePhoto = fileChooserPhoto.files[0];
  const filePhotoName = filePhoto.name.toLowerCase();
  const similar = FILE_TYPES.some((it) => {
    const endsNamePhoto = filePhotoName.endsWith(it);
    return endsNamePhoto;
  });

  const containerPhoto = document.querySelector('.ad-form__photo img');

  if (similar) {
    if (containerPhoto === null) {
      blockPositionCenter(previewPhoto);
      const photo = createPhoto(previewPhoto);
      photo.src = URL.createObjectURL(filePhoto);
    } else {
      const container = createContainerPhoto(formPhotoContainer);
      const photo = createPhoto(container);
      photo.src = URL.createObjectURL(filePhoto);
    }
  }
});

export {clearPhoto};
