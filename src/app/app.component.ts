import {Component} from '@angular/core';
import {Friend} from './friend';
import {Friend} from './add-friend';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MEAN-stack';
  public allFriends = [{firstName: null, lastName: null, email: null, phoneNumber: null}];
  friend = new Friend('', '', '', 0);

  constructor(
      private friendService: FriendService,
  ) {
    this.friendService = friendService;
  }

  onSubmit(): void {
    this.friendService.addFriend(this.friend).subscribe
    (data => this.getRequest
    ('http://localhost:9001/addFriend').then(res => console.log(this.allFriends)), error => console.error(error));
  }

  async getRequest(url: string): Promise<any> {
    // custom getter
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => this.allFriends = data);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): any {
    this.getRequest('http://localhost:9001/allFriends').then(res => console.log(this.allFriends));
  }

  public async deleteFriend(email: string): Promise<any> {
    this.friendService.deleteFriend(email).subscribe
    (data => this.getRequest
    ('http://localhost:9001/deleteFriend').then(res => console.log(this.allFriends)), error => console.error(error));
    await fetch('http://localhost:9001/allFriends', {method: 'get', headers: {'Content-Type': 'application/json'}});
    //    .then(response => {
    //      return response.json() as Promise<any>;
    //    })
    //    .then(response => {
    //      return this.allFriends = response;
    //    });
  }
}
