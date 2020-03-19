import React, { useState, useEffect } from 'react';

import './style.scss'
import axios from 'axios'

import Place from '../../Components/Place'
import { useModal } from '../../Hooks/useModal'


const Home = ({ history }) => {
	const [places, setPlaces] = useState([])
	const [searchText, setSearchText] = useState('')

	const api = 'https://pland-api.herokuapp.com'

	const editModal = useModal()

	async function onSubmitEdit(values, actions) {
		try {
			actions.setSubmitting(true)
			const token = localStorage.getItem('auth_token')
			const headers = { headers: { Authorization: `JWT ${token}` } }
			const changes = {
				id: values.id,
				fields: {
					name: {
						current_value: values.nameOld,
						new_value: values.name
					},
					slug: {
						current_value: values.slugOld,
						new_value: values.slug
					},
					city: {
						current_value: values.cityOld,
						new_value: values.city
					},
					state: {
						current_value: values.stateOld,
						new_value: values.state
					},
				}
			}
			const { data } = await axios.put(api + "/api/v1.0/places/edit", changes, headers)
			actions.setSubmitting(false)
			editModal.close()
			await getAllPlaces()
		} catch (e) {
			localStorage.clear()
			history.push('/login')
		}
	}

	async function getAllPlaces() {
		try {
			const token = localStorage.getItem('auth_token')
			const headers = { headers: { Authorization: `JWT ${token}` } }
			const { data } = await axios.get(api + "/api/v1.0/places", headers)
			setPlaces(data.places)
			console.log('Places update')
		} catch (e) {
			localStorage.clear()
			history.push('/login')
		}
	}

	async function searchPlaceByName(name) {
		try {
			if (name.length === 0) {
				return getAllPlaces()
			}
			const token = localStorage.getItem('auth_token')
			const headers = { headers: { Authorization: `JWT ${token}` } }
			const { data } = await axios.get(api + `/api/v1.0/places/search/${name}`, headers)
			setPlaces(data.places)
		} catch (e) {
			localStorage.clear()
			history.push('/login')
		}
	}

	useEffect(() => {
		getAllPlaces()
	}, [])

	return (
		<div className="home">
			<div className="home-flex-container">
				<h1>Seus Lugares</h1>

				<div className="searchbar">
					<input type="text" onChange={(e) => {
						setSearchText(e.target.value)
						searchPlaceByName(e.target.value)
					}} />
					<i className="fas fa-search"></i>
				</div>
				<div className="inner-places">
					{places.length > 0
						?
						(places.map((place) => (
							<div key={place.id}> <Place id={place.id} city={place.city} name={place.name} slug={place.slug} state={place.state} onEdit={() => editModal.open(place, onSubmitEdit)} /> </div>
						)))
						:
						searchText.length > 0 ? '' :
							(
								<div className="loader-container">
									<img className="loader" alt="loader_img" src="/imgs/loading.svg" />
								</div>
							)}
				</div>
			</div>
		</div>
	)
}

export default Home