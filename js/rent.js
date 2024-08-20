const imgList = document.querySelector(".imgList");

async function imgLoad() {
    try {
        const response = await fetch("/api/rents");
        const res = await response.json();

        const currentUrl = window.location.href;
        const path = window.location.pathname;
        const albumId = parseInt(path.split('/')[2]);

        console.log(albumId);

        console.log(res);

        imgList.innerHTML = ``;

        let rental = res[albumId - 1];

        console.log(rental);

        for (let i = 0; i < rental.name.length; i++) {
            const imgContainer = document.createElement("div");
            imgContainer.className =
                "item-portfolio item-4cols gallery-post rentItem";
            imgContainer.style.cssText = "height: 330px;";

            imgContainer.innerHTML = `
                            <a
                                href="/#contact"
                                class="lightbox"
                                title=""
                            >
                                <img
                                    class="img-fluid"
                                    loading="lazy"
                                    src="${rental.images[i][0] !== "h" ? ("../" + rental.images[i]) : rental.images[i]}"
                                    alt = ""
                                    title = ""
                                    width = "750"
                                    height = "750"
                                />
                            </a >
                            <p
                                style="
                                    text-align: center;
                                    font-size: 1.2rem;
                                    margin-top: 10px;
                                    font-weight: bold;
                                    margin-bottom: 0px;
                                "
                            >
                                ${rental.name[i].length > 20
                    ? rental.name[i].slice(0, 20) + "..."
                    : rental.name[i].slice(0, 20)
                }
                            </p>
                            <p
                                style="
                                    margin-top: 0px;
                                    text-align: center;
                                    font-size: 1.2rem;
                                    font-weight: bold;
                                "
                            >
                                Giá thuê: ${rental.price[i]} VND
                            </p>
        `;

            imgList.appendChild(imgContainer);
        }
    } catch (error) {
        console.log(`Error while fetching data ${error} `);
    }
}

imgLoad();