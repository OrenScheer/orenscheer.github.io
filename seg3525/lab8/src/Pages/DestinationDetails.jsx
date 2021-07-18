import { useHistory, useParams } from "react-router-dom";
import { Layout, Typography, Statistic } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const { Title, Text, Link } = Typography;

const { Content } = Layout;

const destinations = {
  Rome: {
    name: { eng: "Rome", fra: "Rome" },
    population: "2.9M",
    videoOne: "https://www.youtube.com/embed/JKT4n1rHV-0",
    videoTwo: "https://www.youtube.com/embed/M04pFl01iF8",
    map: "https://www.google.com/maps/d/embed?mid=1m4wGOiG0fnYO_urg47zXJAREYt8",
    text: {
      eng: "Rome (Italian and Latin: Roma [ˈroːma] (About this soundlisten)) is the capital city and a special comune of Italy (named Comune di Roma Capitale), as well as the capital of the Lazio region. The city has been a major human settlement for almost three millennia. With 2,860,009 residents in 1,285 km2 (496.1 sq mi),[1] it is also the country's most populated comune. It is the third most populous city in the European Union by population within city limits. It is the centre of the Metropolitan City of Rome, which has a population of 4,355,725 residents, thus making it the most populous metropolitan city in Italy.[2] Its metropolitan area is the third-most populous within Italy.Rome is located in the central-western portion of the Italian Peninsula, within Lazio (Latium), along the shores of the Tiber. ",
      fra: "Rome (/ʁɔm/1 Écouter ; en italien : Roma /ˈroːma/2 Écouter) est la capitale de l'Italie. Située au centre-ouest de la péninsule italienne, près de la mer Tyrrhénienne, elle est également la capitale de la région du Latium. En 2019, elle compte 2 844 395 habitants établis sur 1 285 km2, ce qui fait d'elle la commune la plus peuplée d'Italie et la troisième plus étendue d'Europe après Moscou et Londres3. Son aire urbaine recense 4 356 403 habitants en 20164,5. Elle présente en outre la particularité de contenir un État enclavé dans son territoire : la cité-État du Vatican (Stato della Città del Vaticano), dont le pape est le souverain. C'est le seul exemple existant d'un État à l'intérieur d'une ville. ",
    },
    wikipediaLink: {
      eng: "https://en.wikipedia.org/wiki/Rome",
      fra: "https://fr.wikipedia.org/wiki/Rome",
    },
    flightsFrom: 820,
  },
  Bermuda: {
    name: { eng: "Bermuda", fra: "Bermudes" },
    population: "71K",
    videoOne: "https://www.youtube.com/embed/4bYq8XTxHZU",
    videoTwo: "https://www.youtube.com/embed/J7DWwuo-XY8",
    map: "https://www.google.com/maps/d/embed?mid=1c8TrK_BMiNvJhpaZjlXqL3e9RCA",
    text: {
      eng: "Bermuda (/bərˈmjuːdə/; The Somers Isles, or Islands of Bermuda) is a British Overseas Territory in the North Atlantic Ocean. It is about 1,035 km (643 mi) east-southeast of Cape Hatteras, North Carolina (with Cape Point on Hatteras Island being the nearest landfall); 1,236 km (768 mi) south of Cape Sable Island, Nova Scotia; 1,759 km (1,093 mi) northeast of Cuba, and 1,538 km (956 mi) due north of the British Virgin Islands. Though typically referred to in the singular, Bermuda has 181 islands; the largest of these being Main Island. Bermuda's capital city is Hamilton. Bermuda is internally self-governing, with its constitution and cabinet of ministers selected from the elected Members of the lower house of a Parliament that enacts local laws. ",
      fra: "Les Bermudes (en anglais : Bermuda, /bəˈmjuːdə/2) constituent un archipel d'Amérique du Nord membre associé de la communauté caribéenne et un territoire britannique d'outre-mer. Les habitants sont appelés Bermudiens. L'économie de l'archipel repose en grande partie sur les finances à cause de son statut de paradis fiscal. ",
    },
    wikipediaLink: {
      eng: "https://en.wikipedia.org/wiki/Bermuda",
      fra: "https://fr.wikipedia.org/wiki/Bermudes",
    },
    flightsFrom: 490,
  },
};

const text = {
  moreOnWikipedia: {
    eng: "Read more on Wikipedia",
    fra: "Voir plus sur Wikipédia",
  },
  flightsStartingAt: {
    eng: "Flights starting at",
    fra: "Vols de",
  },
};

const DestinationDetails = ({ language }) => {
  const { place } = useParams();
  const history = useHistory();
  let destination = destinations[place];

  if (!destination) {
    history.replace("/notfound");
  }

  return (
    <>
      {destination && (
        <Layout height="500px" style={{ backgroundColor: "white" }}>
          <Title level={3} style={{ marginLeft: "20px" }}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ marginRight: "15px" }}
            />
            {`Destination: ${destination.name[language]}`}
          </Title>
          <Content
            style={{
              height: "500px",
              marginLeft: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <div style={{ display: "flex" }}>
                <Statistic title="Population" value={destination.population} />
                <Statistic
                  title={text.flightsStartingAt[language]}
                  value={
                    language === "eng"
                      ? `$${destination.flightsFrom}`
                      : `${destination.flightsFrom}$`
                  }
                  style={{ marginLeft: "50px" }}
                />
              </div>
              <Text>
                {destination.text[language]}
                <Link
                  href={destination.wikipediaLink[language]}
                  target="_blank"
                >
                  {text.moreOnWikipedia[language]}
                </Link>
              </Text>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <iframe
                  width="400"
                  height="250"
                  src={destination.videoOne}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  style={{ margin: "0" }}
                />
                <iframe
                  width="400"
                  height="250"
                  src={destination.videoTwo}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  style={{ margin: "0" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <iframe
                width="500"
                height="100%"
                src={destination.map}
                title="Attractions map"
                style={{ margin: "0" }}
              />
            </div>
          </Content>
        </Layout>
      )}
    </>
  );
};

export default DestinationDetails;
