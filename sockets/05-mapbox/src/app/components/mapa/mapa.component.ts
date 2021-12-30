import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Lugar } from 'src/app/interfaces/interfces';
import { WebsocketService } from 'src/app/services/websocket.service';

interface RespMarcadores {
	[key: string]: Lugar;
}

@Component({
	selector: 'app-mapa',
	templateUrl: './mapa.component.html',
	styleUrls: ['./mapa.styles.css'],
})
export class MapaComponent implements OnInit {
	mapa!: mapboxgl.Map;

	lugares: RespMarcadores = {};

	markerMapbox: { [id: string]: mapboxgl.Marker } = {};

	constructor(
		private wsService: WebsocketService,
		private http: HttpClient
	) {}

	ngOnInit(): void {
		this.http
			.get<RespMarcadores>('http://localhost:5500/marcadores')
			.subscribe((lugares) => {
				this.lugares = lugares;
				this.crearMapa();
			});

		this.wsService.nuevoMarcador.subscribe((marcador) => {
			this.agregarMarcador(marcador);
		});
		this.wsService.borrarMarcador.subscribe((id) => {
			this.markerMapbox[id].remove();
			delete this.markerMapbox[id];
		});
		this.wsService.moverMarcador.subscribe(
			(payload: { id: string; lat: number; lng: number }) => {
				this.markerMapbox[payload.id].setLngLat([
					payload.lng,
					payload.lat,
				]);
			}
		);
	}

	crearMapa() {
		this.mapa = new mapboxgl.Map({
			accessToken:
				'pk.eyJ1IjoiZmVybWluYWN1bmEiLCJhIjoiY2t4cXAzbjZkNHBqZDJ1bWZmaGszbjgwcSJ9.EToF2wVTYe7LElaZA0m6KQ',
			container: 'mapa',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-75.75512993582937, 45.349977429009954],
			zoom: 15.8,
		});
		for (const [key, marcador] of Object.entries(this.lugares)) {
			this.agregarMarcador(marcador);
		}
	}

	agregarMarcador(marcador: Lugar) {
		const h2 = document.createElement('h2');
		h2.innerText = marcador.nombre;

		const btnBorrar = document.createElement('button');
		btnBorrar.setAttribute('class', 'btn btn-danger');
		btnBorrar.innerText = 'Borrar marcador';

		const br = document.createElement('br');

		const div = document.createElement('div');
		div.append(h2, br, btnBorrar);

		const popUp = new mapboxgl.Popup({
			offset: 25,
			closeOnClick: false,
		}).setDOMContent(div);

		btnBorrar.addEventListener('click', () => {
			marker.remove();
			this.wsService.emit('borrar-marcador', marcador.id);
		});

		const marker = new mapboxgl.Marker({
			draggable: true,
			color: marcador.color,
		})
			.setLngLat([marcador.lng, marcador.lat])
			.setPopup(popUp)
			.addTo(this.mapa);

		marker.on('drag', () => {
			const lngLat = marker.getLngLat();

			let payload = {
				id: marcador.id,
				lat: lngLat.lat,
				lng: lngLat.lng,
			};

			this.wsService.emit('mover-marcador', payload);
		});

		this.markerMapbox[marcador.id] = marker;
		console.log(this.markerMapbox);
	}

	crearMarcador() {
		const customMarker: Lugar = {
			id: new Date().toISOString(),
			nombre: 'sin-nombre',
			lng: -75.75512993582937,
			lat: 45.349977429009954,
			color: '#' + Math.floor(Math.random() * 16777215).toString(16),
		};

		this.wsService.emit('nuevo-marcador', customMarker);

		this.agregarMarcador(customMarker);
	}
}
