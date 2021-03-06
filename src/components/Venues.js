import React from 'react';
import axios from 'axios';

// Config
import EventBus from '../config/EventBus.js';

// Styles
import '../styles/index.css';
import '../styles/Venues.css';

export default class Venues extends React.Component {


	state = {
		is_loading: false,
		form_data: {
			eating: '',
			place: ''
		},
		venues: []


	}

	componentDidMount() {

		EventBus.on('search_venue', (data) => {
			this.setState({ form_data: data }, () => {

				window.scroll({
					top: 0,
					behavior: 'smooth'
				});

				this.get_venues();

			});
		});

	}

	get_first_photo(venue_id, callback) {

		axios({
			method: 'get',
			url: 'https://api.foursquare.com/v2/venues/' + venue_id + '/photos',
			params: {
				client_id: 'L5SR1EXYJILSL5QASZBISWFNB5D0JKIWVWILMWYVKO24FWBA',
				client_secret: 'QTYAE4RG51LAYVIYEGUGLMRVEPJG3TJYY5WLD1H0I3AY3SHU',
				v: '20180323',
				limit: 1
			}
		})
			.then((response) => {

				let result = -1;

				if (response.data.meta.code === 200) {

					if (response.data.response.photos.items[0] !== undefined) {
						result = response.data.response.photos.items[0];
					}

				}

				callback(result);

			}).catch((error) => {
				callback(-1)
			});

	}

	get_venues() {

		let self = this;
		let eating = this.state.form_data.eating;
		let place = this.state.form_data.place;

		this.setState({ is_loading: true });

		axios({
			method: 'get',
			url: 'https://api.foursquare.com/v2/venues/explore',
			params: {
				client_id: 'L5SR1EXYJILSL5QASZBISWFNB5D0JKIWVWILMWYVKO24FWBA',
				client_secret: 'QTYAE4RG51LAYVIYEGUGLMRVEPJG3TJYY5WLD1H0I3AY3SHU',
				v: '20180323',
				limit: 10,
				near: place,
				query: eating
			}
		})
			.then((response) => {

				self.setState({ is_loading: false, venues: [] });

				if (response.data.meta.code === 200) {

					if (response.data.response.groups[0].items !== undefined) {

						let venues = response.data.response.groups[0].items;

						self.setState({ venues: venues });

						for (let i = 0; i < venues.length; i++) {

							let venue = venues[i];

							self.get_first_photo(venue.venue.id, (photo) => {
								venues[i].venue['photo'] = photo.prefix + '500x500' + photo.suffix;
								self.setState({ venues: venues });
							});

						}

					}

				}

			}).catch((error) => {
				self.setState({ is_loading: false, venues: [] });
			});

	}

	render_list() {

		if (this.state.is_loading === false) {

			if (this.state.venues.length > 0) {

				return this.state.venues.map((venue, key) => (
					<div key={key} className="venue-element box-sizing">

						<div className="venue-element-content" style={{ backgroundImage: 'url(' + venue.venue.photo + ')' }}>


							<div className="venue-element-detail">

								<div className="venue-element-name box-sizing">{venue.venue.name}</div>
								<div className="venue-element-name box-sizing">{venue.venue.location.address}, {venue.venue.location.city}, {venue.venue.location.postalCode}, {venue.venue.location.country}</div>

							</div>

						</div>

					</div>
				));

			}

		}

	}

	render() {
		return (
			<div className="venues">

				{this.render_list()}

			</div>
		);
	}

}