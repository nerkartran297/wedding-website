const imgList = document.querySelector(".imgList");

async function imgLoad() {
    try {
        const response = await fetch("/api/galleries");
        const res = await response.json();

        imgList.innerHTML = ``;

        const currentUrl = window.location.href;
        const path = window.location.pathname;
        const albumId = parseInt(path.split('/')[2]);

        res[albumId - 1].images.forEach((image) => {
            const imgContainer = document.createElement("div");
            imgContainer.className =
                "item-portfolio item-3cols gallery-post";

            imgContainer.innerHTML = `
                <a
                    href="${(image[0] === "h") ? image : ("/" + image)}"
                    class="lightbox"
                    title=""
                    target="_blank"
                >
                    <img
                        class="img-fluid"
                        loading="lazy"
                        src="${(image[0] === "h") ? image : "../" + image}"
                        alt=""
                        title=""
                        width="750"
                        height="750"
                    />
                </a>
                `;

            imgList.appendChild(imgContainer);
        });

        const nextAndPrev = document.querySelector(".nextAndPrev");
        nextAndPrev.innerHTML = `
        <div class="row meta-nav-holder port-meta-nav">
            <div class="col-md-6 meta-nav meta-nav-left">
                <div class="pn-holder">
                    <div class="pn-desc">
                        <div class="prev-next-title">
                            <a href="${(albumId == 1) ? res.length : (albumId - 1)}">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                    style="
                                    enable-background: new 0 0 320
                                        512;
                                "
                                    xml:space="preserve"
                                >
                                    <path
                                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                        class=""
                                    ></path>
                                </svg>
                                Previous Gallery
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 meta-nav meta-nav-right">
                <div class="pn-holder">
                    <div class="pn-desc">
                        <div class="prev-next-title">
                            <a href="${(albumId == res.length) ? 1 : (albumId + 1)}">
                                Next Gallery
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                    style="
                                    enable-background: new 0 0 320
                                        512;
                                "
                                    xml:space="preserve"
                                >
                                    <path
                                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                                        class=""
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </ > `;
    } catch (error) {
        console.log(`Error while fetching data ${error} `);
    }
}

imgLoad();