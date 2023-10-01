const loadPhones = async(searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit)
}

const displayPhones = (phones,dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = ``;
    //display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);  
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    //display no phone founds
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none');
    }
    //display all phones
    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        
        
        <div class="card h-100 p-4">
                            <img  src="${phone.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${phone.phone_name}</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                                    content. This content is a little bit longer.</p>
                                     <button onclick = "loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                                     
                            </div>
                        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    //stop loader
    toggleSpiner(false);
}

const processSearch = (dataLimit) => {
    toggleSpiner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
    // searchField.value = ``;
}
//handle button search click

document.getElementById('btn-search').addEventListener('click', function () {
    //start loader
    processSearch(10);
    

})

//search intput filed using enter key hendler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    
    if (e.key === 'Enter') {
        processSearch(10);
    }
})

const toggleSpiner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// not the best way to show all

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})


const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'} </p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Inforamtion Found'}
    <p> Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Found' } </p>
    
    `;
}

loadPhones('apple')

