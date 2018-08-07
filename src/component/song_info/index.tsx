import React from 'react';
import { connect } from 'react-redux';
import { SongInfo, fetchDetailMusicActionCreator } from '../../reducer/song_single';
import './index.css';
import request from 'superagent';
// import getMusicUrl from '../../utils/musicUrl'
import { playMusic } from '../../reducer/current_song';
import { ReduxStates } from '../../reducer/ReduxStates';

interface SongInfoProps extends SongInfo {
  playMusic:typeof playMusic;
  index:number;
  current_song_hash:string;
}

class SongSingle extends React.Component<SongInfoProps, {}> {
  constructor(props:SongInfoProps) {
    super(props);
    this._onSongClick = this._onSongClick.bind(this);
  }
  public _onSongClick() {
    const hash = this.props['320hash'] || this.props.hash;
    request(`http://localhost:3003/music?hash=${hash}`)
    .then((res) => {
      this.props.playMusic(res.body);
    }, (rej) => console.error(rej));
  }
  public render() {
    return (
      <div className="song">
        <span className={'song_index ' + (this.props.hash === this.props.current_song_hash ? 'active' : '')}>{this.props.index + 1}</span>
        <span className="song_name">{this.props.songname}</span>
        <span className="artist_name">{this.props.singername}</span>
        <span onClick={this._onSongClick}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAI6SURBVGhD7dlL6A1RAMfx67XwiNhQlMfCY+GxshTJVjYKiSxINkqWdqJY2GJBChErsVIWYiM2rFiwYYHyfub9/U7/U7KYe+78555zyvzqU3fmnnM7v+5j5s70unTp0ihjsB338A2/M3uLi1iM6FjiFMKL/MTrjN4jrOUD1iAq2+Ckd/BdmYLcmYdzcF3PMRV948fJCZYoKX5SbsG17XRHXRzsd8KPUwnvxL/ZC4scr7ZqMg0O9MtVYrbA9Z2vtmrSFUmUrkhpSVJkCQ5hYrU1nCQpshTOfYRV7hhCkhbRL5yEr9dmkhb5iC8jj59hA9pK0iIPsAg3R7Z1GbMw2iQvYjzd2Q1fy/2eye6A+5smS5GQ2bgCn9MNLECTZC0SshGegjvmM/ZjPAZJEUXMdJyGv2qOvYsViE0xRULW4jEc/x2HEXMgLa6ImYQTcI48kC5HXYossh5P4ZyvOIAJqEtRRWbiAhwr/77GXh0ppojXAV7BcV7c2IOxiE32IvNxHT6vq5iDQZOtyDjsg+dfPvcCm9A0WYoswx24T2cwA6NJ0iIPcRDhUusTrEMbSVok+IFjmIy2krzIfaxE20lWJPbA1jRJinig8w/VMJOkSIp0RUrL/1fE/wgO9JSixGyF6ztbbfXJGzjY212lxUuyru1ItdUn3j0NrQc5xR525sJLSq4t6oboQnyCE27D211eAcllM3wnQolriI6NX8KJJbFE1B3dv+PN0F3wxuOljPyFOorV6NKlS6P0en8A8n+RUj/SH4gAAAAASUVORK5CYII="/>
        </span>
        <span>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARFSURBVGhD7ZpXqB1FHIev2GOLsVcsoCFYQF8iWFGxoVjwIdYHQ/KgoD4EI6JEQWwPKjZE1AcVK6ISiCIWFBTBKEYQTez4ooiKvaF+3+wZGE52d0bPmRMv3B98nJm9c3b3t2dm/v+ZvVMzarQvLILLKrEEToT1oIrWh1vgL/h7AjwIY5cm7gcv8MHg8wTYqwJ7w33gNXaGsSk1cSucPSjvD7V0Foz1GsMm7Ldjv0iLxnqNNhNqWhnpMqGmjZE+E2raGLkXukyoaWHkdPAED8Ec2HoIj90OttkNamlkI4+AJ8jxFNTUyEZega/g+g6uhQWwAdTUyEZehVVNcZ1qYka2HHzWUlUje8ABYOL4J2wHags4H8yISzgCcqpqxEQuZr6Wo84Bj5XyJeRU1chO8AbcAQbNKGONFzy4kB0hp5nBHlVixKBod2qL+uNSVSOnwhXwNvwB24KaBw/DYxlsY9sSVTVyNXhyZ6wzPTDQUfA+fJTBNrYtUVUjDvDLwY2B2poZ7FElRg6Fx2GzUKujqkaugzfhR/gUopFT4Hfwwjm+g90hp6pGTgYHuib29MBArkvMituy5WGuhE0gp+pdyxNv3xSramKDfcPBZy1VNWKO5E7gMvgJYkDcFBwnxpZh3I1M87IueV4nkePAoLkQqhlxZyUO6icgpii57PdwaNMucDN8Bm3fk0vhP61G+4w4wFeDGxNp17J8GBzTwnwYzsmsG1h/BiePF2EJnAHHw3lwG3wOmvF+XAf9K/UZGYc2gkfBG3we+nIvfwkXYl+DXdluWqzaRu4ETTgVl2bP7s6/B7+A65ki1TRi19HEXaG2tnyBZJdrk8tsd3fs2ht7IKdaRuwmvlf5BLpuZClotGtjw20o/35xqGVUy8ix4E1cEGrtika2CrW1ZVd8F1wOZFXLiLOQU7fbrl3KGVGmOLYx7vSqlpEXIHfeEiNO6bZxvPUqNXIhPNMUg3wa9zTFIHdTzIijnFYvaYpBL8O5TTF0h+eaYpC/zBr4JsG44k1+mxwTE9KouWCbxaHWo9SIgc+0O2o5pE/Vsu2jjNB+J8oLOt2qt+Clphjk4L8R7k5wq8nvmEGkx0+CqIPANm4I9io1YvrwYVMM8nWxm9xRRuQnm2LQO+ArhygD2VVNMTyEj5tip0q61mlgm6NDrUepEVOPdHC6jkinxs3BhDFqNqSpyzYQE0bjgzewT6i1q8SIMchJo69NkE/dvmrmOpw3jYLjzZu8AbqUM+JD9FdeEWoZ7QfuzXrCGviQjNJtMtD9BumvnOom8BxHhlqB7CJmocNri1FxgJr82XXbNi5mQdf6w81BN9Dd6PtfyP+a8IZWwq4eKJDZwK9gVM+OjUnK9YY35tTuFmxcaaYyHTkEHA92p9egZBd/4joQXgdv0sWV5QfAuPE0fAH+7Qe4Booy3nUp3145pRqDvgd/KTPkZ+Ei2AE6NDX1D/c7vlp8Y2PVAAAAAElFTkSuQmCC"/>
        </span>
        <span>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMtSURBVGhD7ZlL6A1RHMev9zOPbLyyQIlYKfY25Jmwk5KFPLNQ9C8KC0skGwuRELZsiPJciLKwoFjYyCOP8sz7+zn3Hs6d5s45c++d/5x/zac+/e8599y58/3/Zs6cmVurqKiosPSXY0t0pOyYEfKx/FOiv+Ue2RE7pd3YuxL8KPn+L3K8bAuq8UqyoQ90lMASaStzmI52sNWIJUhbVXGrEUsQzF0VW42Hjb9lB3kgf8lcVXGrsbLxNzTIcDk1wCmyn/Rhg5yR5xqvg6tiq3FTjm68DgnCnP9eMj7E49KHG2SmDK6KW40FMk+QYfK6fBbgU7ld+nCDQHBV3GpAniBFkAwyS3qrkqwGxBYEvFWx1bhhWnViDJJZlbRqQIxBoGVV0qoBsQZpWZWXkg+41YBYg4Ctyj7TasCcfqz+somYg0yTHEGM8RJzkFxUQbpEFSRJFaRLVEGSlBVksOTma4fsk0EWyovSPgayshy5JwnGujA3vRVksuSmzN1xbr7uyEfSDcZyarnMRW8EmStfSL7nteS/nlyeD5GcL3cl43hguFsGU3QQKmFDXJajpMskOaj+8h9b5Q/JZzbQEULRQa5Jtn9JDqDDYZ7kP3/ItJpZK/ncJ8ni0UuRQRZJts0N3Rg6Evim3hOS90+alocigzA7sW3OiTR8QSbK7w15FJVJUUE47pmJmJ0m0JFCyMXwimTMKtPKoKggXOzYLlOsZb5c43hQMuaW04fL5FAJ3B0yZq9pZVBUEHaa7TKdArMXJzZ9Ie6SsEXSPmpaGRQVZIZku1zsgEPtiLzgSCUY89zpw7NytgQCMeaAaWVgg3yWbnk7db1ku0yfXOzSCDlHTknGbDStDPghkoFFulSm4QsyULISYEzQtaRHuqXtlrclO8F6Kg1fkM2S9++bVomwirXP07bRkcBeME+bVjPT5VvJ+4vpKJsVktnqp1xHhwNTLAvDOab1H0I8kYTgIV002JkHWXa0ukByTnA48bM1Y5m6+YUsKljFfpXsIEuOq3K/3CSpCuupN9IGPi+jC2HhkOEa8U3aHU7Kj6KcO32CcXK1ZPnB82gqw3UiY4qt1f4Cr63Bx3ewKx8AAAAASUVORK5CYII="/>
          </span>
        <span>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJKSURBVGhD7dm7axRRFMfxxUd8YKJdGh+NnQqpI1ipjVgIigji6w+wERUEDTEggoIpgqgQhBAF7cVCVEK0EV9YaqEIPhDBRotAovn+ZA4cxpndmVXujLv3B59iztzZmUOGufeSRkxMTExMTEx2NuFqzekZW2YHftWcnrFlOrKRLzifuJTUjI7tXAh6Frt36UZeqZBkJawuOg4ZPYvdO3gji7ENl/EY7/ART3ET+9CHIqmskT14A39Nlm84gWVoluCNLMUk/NginmE18hK0kR5MwY+bwS0cwhYMYjf0un2FH/sJ65CVoI1chx9zB3kPpvTiIn7CrtE9lyOdYI1shz+vGXgBiuQAfDMjSCdYIy9g5+5hIcrkLOz6H+iHT5BGBmD1WWxA2egj8R72O0fhE6SRM7D6AxXazDDsd+6r4BKkkduw+ikVcnIQmjNW/D76M5thv/NZBZcgjUzD6vtVyMhO2JgLKmRE84iNmYNWBpb/qpE1sDGVNKIJz+qtXq3jqO2rdRpWf6hCm/GfYH3CfYI04j+/eiU2omy0aKz886s8h53TX6XshHgOdv13VDIhKtp3+PPXULSZw/BLFL1i6QRrRBmHH3MX65GXVRiFb+IlKl00KlrG67Xy47SM14R5BLaM16brCtLLeO0e1yIrQRtRtGaagB9bhLa/tdlY+ezCa/hrsmirewxL0CyVNaIswlaM4RHe4gOe4Ab2QpurIqm0kX+Zv2pEe+iTiaGkZnRs50LQs9i9SzdSV93VSMf8WyEmJiYmJqbL0mjMA61WoLA5VCRAAAAAAElFTkSuQmCC"/>
          </span>
      </div>
    );
  }
}
function map_states_to_props(state:ReduxStates) {
  return {
    current_song_hash: state.currentSongState.hash,
  };
}
function map_dispatch_to_props() {
  return {
    playMusic,
  };
}

export default connect(map_states_to_props, map_dispatch_to_props())(SongSingle);