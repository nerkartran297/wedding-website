const albumCoverInput = document.querySelector('.albumCover');
const imageListInput = document.querySelector('.imageList');
const addAlbumButton = document.querySelector('.addAlbum');
const albumNumberInput = document.querySelector('.albumNumberToAdd');
const imageLinkInput = document.querySelector('.imageLinkToAdd');
const addImageToAlbumButton = document.querySelector('.addImageToAlbum');
const albumName = document.querySelector(".albumName");
const albumType = document.querySelector(".albumType");

async function addAlbum() {
  const LIST = await fetch("/api/galleries");
  const LISTALL = await LIST.json();

  const ID = LISTALL.length;
  let id = ID + 1;
  console.log(ID);

  const cover = albumCoverInput.value;
  const images = imageListInput.value.split(',');
  const name = albumName.value;
  const type = albumType.value

  const password = document.querySelector(".password").value;
  const secretKey = document.querySelector(".secretKey").value;
  const lovelandKey = document.querySelector(".lovelandKey").value;
  // password, secret: secretKey, loveland: lovelandKey

  const response = await fetch('/api/galleries/addAlbum', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, secret: secretKey, loveland: lovelandKey, id, cover, images, name, type }),
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
  } else {
    alert('Album created successfully!');
    albumCoverInput.value = '';
    imageListInput.value = '';
  }
}

async function addImageToAlbum() {
  const id = albumNumberInput.value;
  const imageLink = imageLinkInput.value;

  const password = document.querySelector(".password").value;
  const secretKey = document.querySelector(".secretKey").value;
  const lovelandKey = document.querySelector(".lovelandKey").value;
  // password, secret: secretKey, loveland: lovelandKey

  const response = await fetch('/api/galleries/addImage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, secret: secretKey, loveland: lovelandKey, id, imageLink }),
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
  } else {
    alert('Image added successfully!');
    imageLinkInput.value = '';
  }
}

addAlbumButton.addEventListener('click', addAlbum);
addImageToAlbumButton.addEventListener('click', addImageToAlbum);
// SAVING CHANGE FOR CONTENT
document.querySelector(".saveChange").addEventListener("click", async () => {
  let AboutUsEn = document.querySelector(".aboutUsEn").value;
  let AboutUsVi = document.querySelector(".aboutUsVi").value;
  let WeddingPlanningEn = document.querySelector(".weddingPlanningEn").value;
  let WeddingPlanningVi = document.querySelector(".weddingPlanningVi").value;
  let EventEn = document.querySelector(".eventEn").value;
  let EventVi = document.querySelector(".eventVi").value;
  let TourEn = document.querySelector(".tourEn").value;
  let TourVi = document.querySelector(".tourVi").value;
  let MiceEn = document.querySelector(".miceEn").value;
  let MiceVi = document.querySelector(".miceVi").value;
  let DestinationEn = document.querySelector(".destinationEn").value;
  let DestinationVi = document.querySelector(".destinationVi").value;

  const password = document.querySelector(".password").value;
  const secretKey = document.querySelector(".secretKey").value;
  const lovelandKey = document.querySelector(".lovelandKey").value;
  // password, secret: secretKey, loveland: lovelandKey

  const response = await fetch('updateContent', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password, secret: secretKey, loveland: lovelandKey,
      AboutUsEn, AboutUsVi, WeddingPlanningEn,
      WeddingPlanningVi, EventEn, EventVi, TourEn,
      TourVi, MiceEn, MiceVi, DestinationEn, DestinationVi
    }),
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
  } else {
    alert('Content edited successfully!');
    AboutUsEn = "";
    AboutUsVi = "";
    WeddingPlanningEn = "";
    WeddingPlanningVi = "";
    EventEn = "";
    EventVi = "";
    TourEn = "";
    TourVi = "";
    MiceEn = "";
    MiceVi = "";
    DestinationEn = "";
    DestinationVi = "";
  }
});
// DELETING
const imageNumberToDeleteInput = document.querySelector('.imageNumberToDelete');
const albumNumberToDeleteInput = document.querySelector('.albumNumberToDelete');
const deleteImageButton = document.querySelector('.imageDelete');

const albumNumberToDeleteFullInput = document.querySelector('.albumNumberToDeleteFull');
const deleteAlbumButton = document.querySelector('.albumDelete');

async function deleteImage() {
  const imageNumber = imageNumberToDeleteInput.value;
  const albumNumber = albumNumberToDeleteInput.value;

  if (!confirm('Are you sure you want to delete this image?')) {
    return;
  }

  const password = document.querySelector(".password").value;
  const secretKey = document.querySelector(".secretKey").value;
  const lovelandKey = document.querySelector(".lovelandKey").value;
  // password, secret: secretKey, loveland: lovelandKey

  const response = await fetch('/api/galleries/deleteImage', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, secret: secretKey, loveland: lovelandKey, imageId: imageNumber, id: albumNumber }),
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
  } else {
    alert('Image deleted successfully!');
    imageNumberToDeleteInput.value = '';
    albumNumberToDeleteInput.value = '';
  }
}

async function deleteAlbum() {
  const albumNumber = albumNumberToDeleteFullInput.value;

  if (!confirm('Are you sure you want to delete this album?')) {
    return;
  }

  console.log(albumNumber);
  const password = document.querySelector(".password").value;
  const secretKey = document.querySelector(".secretKey").value;
  const lovelandKey = document.querySelector(".lovelandKey").value;
  // password, secret: secretKey, loveland: lovelandKey

  const response = await fetch('/api/galleries/deleteAlbum', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, secret: secretKey, loveland: lovelandKey, id: albumNumber }),
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
  } else {
    alert('Album deleted successfully!');
    albumNumberToDeleteFullInput.value = '';
  }
}

deleteImageButton.addEventListener('click', deleteImage);
deleteAlbumButton.addEventListener('click', deleteAlbum);

const Add = document.querySelector(".addRental");
const Remove = document.querySelector(".removeRental");

Add.addEventListener("click", async () => {
  const rentalId = document.querySelector(".rentalAdd").value;
  const itemImage = document.querySelector(".itemImage").value;
  const itemPrice = document.querySelector(".itemPrice").value;
  const itemName = document.querySelector(".itemName").value;

  const password = document.querySelector(".password").value;
  const secretKey = document.querySelector(".secretKey").value;
  const lovelandKey = document.querySelector(".lovelandKey").value;
  // password, secret: secretKey, loveland: lovelandKey

  const response = await fetch('/api/rents/addItem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, secret: secretKey, loveland: lovelandKey, imageLink: itemImage, name: itemName, price: itemPrice, groupName: rentalId }),
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
  } else {
    alert('Image deleted successfully!');
  }
});
Remove.addEventListener("click", async () => {
  const rentalRemove = document.querySelector(".rentalRemove").value;
  const itemRemove = document.querySelector(".itemRemove").value;

  // let rentName = ["WelcomeGate", "WelcomeGate", "TableDecor", "Bar", "DJConsole", "Chair", "HospitalityDesk", "Chandeliers"];

  if (!confirm('Are you sure you want to delete this album?')) {
    return;
  }

  const password = document.querySelector(".password").value;
  const secretKey = document.querySelector(".secretKey").value;
  const lovelandKey = document.querySelector(".lovelandKey").value;
  // password, secret: secretKey, loveland: lovelandKey

  const response = await fetch('/api/rents/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, secret: secretKey, loveland: lovelandKey, groupName: rentalRemove, itemNumber: itemRemove - 1 }),
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
  } else {
    alert('Image deleted successfully!');
  }
});