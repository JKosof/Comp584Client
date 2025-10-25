import { Component, OnInit } from '@angular/core';
import { PopulationData } from './population-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-population',
  imports: [RouterLink],
  templateUrl: './country-population.html',
  styleUrl: './country-population.scss'
})
export class CountryPopulation implements OnInit {
  countryPopulation!: PopulationData;
    constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
      
    }

  ngOnInit(): void {
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get<PopulationData>(`${environment.apiUrl}/api/Countries/population/${idParam}`).subscribe(result => {
        this.countryPopulation = result;
      });
  }
}
