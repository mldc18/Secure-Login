$("#createAlbum").click(function () {
    $("#createAlbumModal").modal("toggle");
});
$("#createAlbumForm").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/create-album",
        data: $("#createAlbumForm").serialize(),
        success: function (data) {
            $(".toast-body").text("Successfully created an album!");
            $("#toastProfile").toast("show");
            $("#createAlbumModal").modal("toggle");
            $("#createAlbumForm")[0].reset();
            $(".album-container").append(
                `<div class="gallery col-md-4 p-0 m-2" id="gallery` +
                    data.id +
                    `">
                    <div onclick="clickView(` +
                    data.images +
                    `)">
                        
                    </div>
                    <h4 class="desc px-3 pt-3">` +
                    data.album_title +
                    `</h4>
                    <h6 class="px-3"> ` +
                    0 +
                    ` photos </h6>
                    <div class="px-3 text-light btn btn-dark btn-sm w-100" onclick="deleteAlbum(` +
                    data.id +
                    `)">delete<i class="px-1 pb-2 fas fa-trash-alt text-light"></i></div>
                </div>`
            );
        },
        error: function (response) {
            $(".alert").show();
            $(".alert").text("Album title already exists!");
            $(".alert").delay(3200).fadeOut(300);
        },
    });
});

function deleteAlbum(albumId) {
    let galleryElement = "#gallery" + albumId;
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": jQuery('meta[name="csrf-token"]').attr("content"),
        },
    });
    $.ajax({
        type: "POST",
        url: "delete-album/" + albumId,
        success: function (data) {
            $(galleryElement).remove();
            $(".toast-body").text(data);
            $("#toastProfile").toast("show");
        },
        error: function (data) {
            console.log("error");
        },
    });
}

function clickView(albumImages) {
    $("#imagesModal").modal("show");
    $(".imageContainer").html("");
    $(".pageContainer").html("");
    if (albumImages) {
        for (i of albumImages) {
            imageNumber = parseInt(albumImages.indexOf(i)) + 1;
            $(".imageContainer").append(
                `<img class="imageClickView m-3" id="imageClickView` +
                    imageNumber +
                    `" src="` +
                    i +
                    `">`
            );
            $(".pageContainer").append(
                `<span class="badge bg-danger mx-1" onclick="focusOnImage(` +
                    imageNumber +
                    `)">` +
                    imageNumber +
                    `</span>`
            );
        }
    } else {
        $(".imageContainer").append(`<h1>There are no photos yet!</h1>`);
    }
}

function convertImagesSmall() {
    $(".imageClickView").attr("class", "imageClickView m-3");
    $(".imageClickView").addClass("col-md-3");
}

function convertImagesMedium() {
    $(".imageClickView").attr("class", "imageClickView m-3");
    $(".imageClickView").addClass("col-md-5");
}

function convertImagesRegular() {
    $(".imageClickView").attr("class", "imageClickView m-3");
    $(".imageClickView").addClass("col-md-12");
}

function focusOnImage(imageElement) {
    $("#imageClickView" + imageElement)[0].scrollIntoView({
        behavior: "smooth",
    });
}
