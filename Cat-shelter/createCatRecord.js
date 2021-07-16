module.exports = ({id, name, description, breed, image}) => {
    return `
    <li cat-id=${id}>
        <img src="${`./content/images/${image}`}" alt="">
        <h3>${name}</h3>
        <p><span>Breed: </span>${breed}</p>
        <p><span>Description: </span>${description}</p>
        <ul class="buttons">
			<li class="btn edit"><a href="/edit/id=${id}">Change Info</a></li>
			<li class="btn delete"><a href="/delete/id=${id}">New Home</a></li>
		</ul>
    </li>`;
}