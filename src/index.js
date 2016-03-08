import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTsearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';

const API_KEY = 'AIzaSyA4rtv5xCXcAXvtu2yZymWzlzRM7vUKQ7E';



class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            videos: [],
            selectedVideo: null
        };
      
      this.videoSearch('LeBron');                
    }
    
    videoSearch(term) {
        YTsearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0] 
            });
        });
    }
    
    render() {
      const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);
      
      return (
        <div>
            <SearchBar onSearchTermChange={videoSearch} />
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList 
              onVideoSelect={selectedVideo => this.setState({selectedVideo})}
              videos={this.state.videos} />
        </div>
      );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));

