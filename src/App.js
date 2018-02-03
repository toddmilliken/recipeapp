

import React, { Component } from 'react';

class App extends Component {

	/**
	 * Initialize state.
	 *
	 * Sets the initial state of the App.
	 * Creates an empty array of recipes in our state to start out with. 
	 * 
	 * @since 1.0.0
	 */
	constructor() {
		super();
		this.state = {
			// Empty recipes array. We'll fill this array up with posts from the REST API.
			recipes: []
		}
	}

	/**
	 * Fires after component mounts.
	 *
	 * This is a great place to make external API calls.
	 * Updates the App state with results from a WP REST API call for posts.
	 *
	 * @since 1.0.0
	 */
	componentDidMount() {

		// Defines the REST API endpoint for the 'recipes' post-type.
		let dataURL = "http://recipesite.local/wp-json/wp/v2/recipes?_embed";

		// Sends a request for a response from the REST API endpoint.
		fetch(dataURL)
			.then(res => res.json())
			.then(res => {
				// Sets state, which in turn fires the render() method because state has changed.
				this.setState({
					recipes: res
				})
			})

	}

	/**
	 * Renders the App. 
	 *
	 * @since 1.0.0
	 */
	render() {
		let recipes = this.state.recipes.map((recipe, index) => {

			// Image HTML.
			let imageHTML = recipe._embedded['wp:featuredmedia'] ? <img src={recipe._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} alt="" /> : '' ;

			// Ingredients.
			let ingredients = recipe.acf.recipe_ingredients
			let ingredientsHTML = Object.keys(ingredients).map( key => {
				let quantity   = ingredients[key].quanity
				let ingredient = ( ingredients[key].item )
				return <div className="ingredient">
					<span className="ingredient__quantity">{quantity} </span>
					<span className="ingredient__item">{ingredient}</span>
				</div>
			} )

			// Directions.
			let directions = recipe.acf.recipe_directions;
			let directionsHTML = Object.keys(directions).map( key => {
				let instruction   = directions[key].instruction
				return <div className="instruction"><p dangerouslySetInnerHTML={{ __html: instruction }} /></div>
				
			} )

			// Total Time.
			let totalTime = recipe.acf.recipe_total_time;

			// Serving Size.
			let servingSize = recipe.acf.recipe_serving_size;

			// Author Name.
			let authorName = recipe.acf.recipe_author_name;

			// Source URL.
			let sources = recipe.acf.recipe_sources;

			// <p><strong>Release Year:</strong> {recipe.acf.release_year}</p>
			// 	<p><strong>Rating:</strong> {recipe.acf.rating}</p>
			// 	<div><strong>Description:</strong><div dangerouslySetInnerHTML={ {__html: recipe.acf.description} } /></div>
			return <div key={index}>
				<p><strong>Title:</strong> {recipe.title.rendered}</p>
				{imageHTML}
				{ingredientsHTML}
				{directionsHTML}
				{totalTime}
				{servingSize}
				{authorName}
				{sources}
				
			</div>
		})
		return (
			<div>
				<h2>Recipes</h2>
				{recipes}
			</div>
			)
	}

}

export default App;
