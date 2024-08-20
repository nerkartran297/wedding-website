const portfolio = document.querySelector('.portfolioContainer');

async function galleryLoad() {
    try {
        const response = await fetch("/api/galleries");
        let res = await response.json();

        portfolio.innerHTML = ``;

        for (let i = 0; i < res.length; i++) {
            const gallery = res[i];

            const galleryContainer = document.createElement("div");
            galleryContainer.className = 'item-portfolio item-portfolio-v2 item-4cols wedding';

            galleryContainer.innerHTML = `
            <div class="item-portfolio-holder-v2">
                <div class="post-image item-grid-image-v2">
                    <img
                        loading="lazy"
                        src="${(gallery.cover[0] === "h") ? gallery.cover : ("../" + gallery.cover)}"
                        class="img-grid-v2"
                        alt="picture"
                        width="750"
                        height="750"
                    />
                    <a href="album/${i + 1}"></a>
                </div>
                <div class="item-text-holder-v2">
                    <h2 class="item-title display-6">
                        <a href="album/${i + 1}">${gallery.name}</a>
                    </h2>
                    <ul class="portfolio-categ portfolio-categ-v2">
                        <li><a href="album/${i + 1}">${gallery.type}</a></li>
                    </ul>
                </div>
            </div>
            `;

            portfolio.appendChild(galleryContainer);
        }
    } catch (error) {
        console.log(`Error while fetching data ${error}`);
    }
}

galleryLoad();

const WPIMG = document.querySelector(".WPIMG");
const EIMG = document.querySelector(".EIMG");
const MIMG = document.querySelector(".MIMG");

async function sectionImage() {
    try {
        const response = await fetch("/api/section");
        let res = await response.json();

        WPIMG.src = res.wpimg;
        MIMG.src = res.mimg;
        EIMG.src = res.eimg;

        document.querySelector(".ytbvid").src = res.homevid;
    } catch (error) {
        console.log(`Error while getting sectionImage, ${error}`);
    }
}