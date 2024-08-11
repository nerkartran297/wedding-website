const portfolio = document.querySelector('.portfolioContainer');

async function galleryLoad() {
    try {
        const response = await fetch("gallery.json");
        const res = await response.json();

        portfolio.innerHTML = ``;

        const ytb = document.querySelector(".ytbvid");
        ytb.src = res.HomeVideo;

        res.Gallery.forEach(gallery => {
            const galleryContainer = document.createElement('div');
            galleryContainer.className = 'item-portfolio item-portfolio-v2 item-4cols wedding';

            galleryContainer.innerHTML = `
            <div class="item-portfolio-holder-v2">
                <div class="post-image item-grid-image-v2">
                    <img
                        loading="lazy"
                        src="${gallery.cover}"
                        class="img-grid-v2"
                        alt="picture"
                        width="750"
                        height="750"
                    />
                    <a href="album_${gallery.id}.html"> </a>
                </div>
                <div class="item-text-holder-v2">
                    <h2 class="item-title display-6">
                        <a href="album_${gallery.id}.html">${gallery.name}</a>
                    </h2>
                    <ul class="portfolio-categ portfolio-categ-v2">
                        <li><a href="#">${gallery.type}</a></li>
                    </ul>
                </div>
            </div>
            `;

            portfolio.appendChild(galleryContainer);
        });
    } catch (error) {
        console.log(`Error while fetching data ${error}`);
    }
}

galleryLoad();

