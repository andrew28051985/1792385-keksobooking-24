const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file');
const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const previewPhoto = document.querySelector('.ad-form__photo');
const formPhotoContainer = document.querySelector('.ad-form__photo-container');

const createContainerPhoto = (container) => {
  const blockDiv = document.createElement('div');
  blockDiv.style.display = 'flex';
  blockDiv.style.justifyContent = 'center';
  blockDiv.style.alignItems = 'center';
  blockDiv.classList.add('ad-form__photo');

  container.append(blockDiv);
  return blockDiv;
};

const createPhoto = (container) => {
  const photo = document.createElement('img');
  photo.width = '40';
  photo.height = '40';
  container.append(photo);
  return photo;
};

const clear = () => {
  previewPhoto.style = '';
  previewPhoto.textContent = '';
  const collects = formPhotoContainer.querySelectorAll('.ad-form__photo');
  for (let i = 0; i < collects.length; i++) {
    if (i > 0) {
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
      previewPhoto.style.display = 'flex';
      previewPhoto.style.justifyContent = 'center';
      previewPhoto.style.alignItems = 'center';
      const photo = createPhoto(previewPhoto);
      photo.src = URL.createObjectURL(filePhoto);
    } else {
      const container = createContainerPhoto(formPhotoContainer);
      const photo = createPhoto(container);
      photo.src = URL.createObjectURL(filePhoto);
    }
  }
});

export {previewAvatar, clear};
