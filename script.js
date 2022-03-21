const altTextPost = document.getElementById("altText");
const skinPost = document.getElementById("skin");
const cropPost = document.getElementById("crop");
const nipplePost = document.getElementById("nipple");
const adPost = document.getElementById("ad");
const overlay = document.getElementById("altTextOverlay");
const saveButton = document.querySelectorAll(".save");

// Function handling optics of like and dislike and subsequently calling
// the respective handlers passed for the post passed
function likingDisliking (postSelector, e, likeHandler, dislikeHandler) {

    e.stopPropagation()

    likeSVG = postSelector.querySelector(".like")
    
    liked = likeSVG.classList.toggle("liked")

    if (liked) {

        pathItem = '<path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>'

        likeSVG.innerHTML = pathItem;
        
        likeSVG.setAttribute("viewBox", "0 0 48 48");

        likeCount = parseInt(postSelector.querySelector(".likes").innerHTML.replace(',','').split(" ")[0])

        postSelector.querySelector(".likes").innerHTML = "" + (likeCount + 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " likes";
        
        likeSVG.classList.add("liked");

        likeHandler(e)
    }
    else {

        pathItem = '<path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>'

        likeSVG.innerHTML = pathItem;

        likeSVG.setAttribute("viewBox", "0 0 24 24");

        likeCount = parseInt(postSelector.querySelector(".likes").innerHTML.replace(',','').split(" ")[0])

        postSelector.querySelector(".likes").innerHTML = "" + (likeCount - 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " likes";
        
        likeSVG.classList.remove("liked");

        dislikeHandler(e)

    }

    return;
    
}

// Function registering likingDisliking() when post is double tapped or clicked
function addPostLikeListener(postSelector, likeHandler, dislikeHandler){

    likeSVG = postSelector.querySelector(".like")
    image = postSelector.querySelector(".post-image-wrapper") ? postSelector.querySelector(".post-image-wrapper") : postSelector.querySelector(".post-image");

    likeSVG.addEventListener('click', e => likingDisliking(postSelector, e, likeHandler, dislikeHandler))
    image.addEventListener('dblclick', e => likingDisliking(postSelector, e, likeHandler, dislikeHandler))

}

function altText(event){


    overlay.style.display = "flex";
    overlay.firstChild.id = "altTextText"

    document.body.style.overflow = "hidden";

    // Click listener to Animation End of AltTextPost
    overlay.addEventListener('animationend', e => {

        overlay.addEventListener('click', e => {
            
            document.body.style.overflow = "visible";
            overlay.style.display = "none"
    
        }, {'once': true});
        
    }, {'once': true});

}

function crop(event){

    cropPost.querySelector(".post-image").classList.add("zoomOut");

}

function cropRemove(event){

    cropPost.querySelector(".post-image").classList.remove("zoomOut");
}

function skin(event){

    skinPostImage = skinPost.querySelector(".post-image")
    
    skinPostImage.classList.add("unblocked");
    skinPost.querySelector(".post-image-wrapper svg").style.display = 'none';
}

function skinRemove(event){

    skinPostImage = skinPost.querySelector(".post-image");

    skinPostImage.style.animationDirection = "reverse";
    
    newone = skinPostImage.cloneNode(true);
    skinPostImage.parentNode.replaceChild(newone, skinPostImage);

    skinPostImage = newone;

    // Set doubletap event listener again because new node
    //skinPostImage.addEventListener('dblclick', e => likingDisliking(skinPost, e, skin, skinRemove))


    // Add 'Blocked' svg at Animation End of SkinPost
    skinPostImage.addEventListener('animationend', e => {
        skinPost.querySelector(".post-image-wrapper svg").style.display = 'block';
        skinPostImage.style.animationDirection = "normal";
        skinPostImage.classList.remove("unblocked")
    
        e.stopPropagation();
    }, {'once': true});

}

function nipple(e){

    nippleFirstImage = nipplePost.querySelector(".post-image");

    nippleFirstImage.classList.add("roll-out-first-nipple");
    
    nippleSecondImage = nipplePost.querySelector(".second-post-image");

    nippleSecondImage.classList.add("roll-in-second-nipple");
    nippleSecondImage.style.display = "block";
    
    nippleFirstImage.addEventListener('animationend', e => {
        nippleFirstImage.style.display = "none";

    }, {'once': true})
}

function nippleRemove(e){

    nippleFirstImage = nipplePost.querySelector(".post-image");
    nippleSecondImage = nipplePost.querySelector(".second-post-image");

    nippleFirstImage.src = "img/posts/nipple_2.png";
    nippleSecondImage.src = "img/posts/nipple_1.png";

    newone = nippleFirstImage.cloneNode(true);
    nippleFirstImage.parentNode.replaceChild(newone, nippleFirstImage);
    nippleFirstImage = newone;

    newtwo = nippleSecondImage.cloneNode(true);
    nippleSecondImage.parentNode.replaceChild(newtwo, nippleSecondImage);
    nippleSecondImage = newtwo;

    nippleFirstImage.style.display = "block";

    nipple(e);

    nippleSecondImage.addEventListener('animationend', e => {

        nippleFirstImage.classList.remove('roll-out-first-nipple')

        newone = nippleFirstImage.cloneNode(true);
        nippleFirstImage.parentNode.replaceChild(newone, nippleFirstImage);
        nippleFirstImage = newone;

        nippleSecondImage.classList.remove('roll-in-second-nipple')

        newtwo = nippleSecondImage.cloneNode(true);
        nippleSecondImage.parentNode.replaceChild(newtwo, nippleSecondImage);
        nippleSecondImage = newtwo;

        nippleFirstImage.src = "img/posts/nipple_1.png";
        nippleSecondImage.src = "img/posts/nipple_2.png";

        nippleFirstImage.style.display = "block";
        nippleSecondImage.style.display = "none";

    }, {'once': true});

}

function ad(e) {
    adPost.querySelector(".post-image-wrapper").classList.toggle("baby-shower");

    postImage = adPost.querySelector(".post-image");

    if (postImage.src.endsWith("img/posts/dollar.jpg"))
        postImage.src = postImage.src.replace("jpg", "png");
    else 
        postImage.src = postImage.src.replace("png", "jpg");
}

// Click Listeners for each save post icon
saveButton.forEach(button => {
    button.addEventListener('click', e => {
        if (button.classList.toggle("saved")){
            button.innerHTML = '<path d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path>'
        }
        else {
            button.innerHTML = '<polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>'
        }
        e.stopPropagation()
    });
});


var descriptionTexts = document.querySelectorAll(".description-text");

shave(descriptionTexts, 40, { character: '... more' });

descriptionTexts.forEach(dt => {

    const dtExpand = dt.querySelector(".js-shave-char");
    
    if (!dtExpand) return;

    // Exclude NipplePost because of manual insertion of <span> elements
    if (nipplePost.contains(dtExpand)) {
        dtExpand.addEventListener('click', e => {
            nipplePost.querySelector(".description-text").innerHTML = "\
            Among the community guidelines reglementing nudity on for example Facebook and Instagram is a ban on pictures of real, naked adults \
            if they include genitalia. What these guidelines explicitly include in their prohibition is the display of female nipples, \
            with some exceptions like a connection to a medical context, child birth or protest. Male nipples do not fall under the \
            restrictions imposed by the definition of nudity and sexual behaviour. This distinction by two of the most prominent social platforms \
            resulting in a ban of nipples based on the assumend gender of the depicted person has spiked criticism within the community \
            and from social activists. Since 2012, the <a href='https://www.instagram.com/freethenipple' style='color: #00376b'>#FreeTheNipple</a> campaign exists in opposition to these platforms' policies, \
            featuring prominent supporters like Miley Cyrus or Chrissy Teigen. Criticism includes the effectively imposed censorship on artist's \
            creativity and the unequal and arbitrarily defined treatment of genders. These pictures were taken from the Instragram account \
            <a href='https://www.instagram.com/genderless_nipples' style='color: #00376b'>@genderless_nipples</a>, a project aimed at challenging the identification of nipples as male or female and the \
            policy behind it.\
            "
            e.stopPropagation();
        }, {'once': true})
        return;
    };

    dtExpand.addEventListener('click', e => {
        dtExpand.style.display = "none";
        dtExpand.nextSibling.removeAttribute("style");
        e.stopPropagation();
    }, {'once': true})

});

// Prefetch Dollar.png
(new Image()).src = "img/posts/dollar.png";


addPostLikeListener(altTextPost, altText, () => {})
addPostLikeListener(cropPost, crop, cropRemove)
addPostLikeListener(skinPost, skin, skinRemove)
addPostLikeListener(nipplePost, nipple, nippleRemove)
addPostLikeListener(adPost, ad, ad);