Ιδέα προς υλοποίηση : Πλατφόρμα υποστήριξης δημιουργίας ταξιδιωτικού πλάνου με βάση κάποιο extreme sport event.

Οι λειτουργίες που υποστηρίζουμε είναι οι εξής:

Event broswing (Λόγω bug του tRPC έχουμε θέμα εμφάνισης των events, όταν τραβάμε τα απο την βάση δίχως να έχουμε κάνει authetication)
Authetication μέσω του Clerk και κατηγοριοποίηση, απο εμάς, των χρηστών σε client users και partners. Χρησιμοποιούνται και αντίστοιχα components, τα οποία κάνουμε Import απο το Clerk module.
Authorization με βάση την ιδιότητα του user. Εάν είναι partner, τότε θα του εμφανίζεται συγκεκριμένο UI (Dashboard, Your events) και αντίστοιχα για τους client users (Home screen, events, Your Plans).
O client user θα μπορεί να επιλέξει κατηγορία extreme sport (με φιλτράρισμα στο aside menu στην σελίδα events) και να φτιάξει ένα traveling plan. Σε αυτό το σημείο χρησιμοοποιούμε τα APIs του airlabs και TripAdvisor απο RapidAPI. O flight router αυτό το οποίο κάνει είναι να τραβάει με βάση το geolocation του εκάστοτε χρήστη να βρήσει τα near by airports, πληροφορία που τραβάμε απο το NearByAirportsDB του API. Αυτο μας απιστρέφει το όνομα του αεροδρομίου, τον οποίο εισάγουμε σε άλλο ένα api call για να λάβουμε τον κωδικο iata 3 χαρακτήρων που συμβολίζει μοναδικά το κάθε αεροδρόμιο. Στην συνέχεια με βάση τον κωδικό αυτό τον οποίο εισάγουμε ώς παράμετρο μαζί με το arrival & departure airport + date κάνουμε άλλο ένα api call για να λάβουμε τις πτήσεις που θέλουμε. (Λόγω πολλών dependant calls αλλά και των περιορισμών του free plan, το airlabs μας κόβει το access, με αποτέλεσμα να τραβάμε ορισμένες πτήσεις που έχουμε κάνει mock και να τις εμφανίζουμε). Ανάλογο αντίκτυπο είχαμε και στα Hotels, όπου ο router έκανε ένα api call στο searchlocationdb για να λάβει το geolocation id (ένας Integer required for 2nd api call), της δοθήσας απο τον χρήστη τοποθεσίας και μέσω αυτού ένα ακόμη api call στο searchoteldb με παράμετρο geoId, arrival/departure date, number of adults/rooms (optional, sort by price) εμφανιζοντάς μας όλα τα διαθέσιμα ξενοδοχεία/καταλύματα. Οπότε κάναμε Mock ορισμένα geoIds και Hotels που είχαμε ήδη τραβήξει. Ο χρήστης μπορεί εν τέλει να δημιουργήσει διαφορετικά event-based ταξιδιωτικά πλάνα και στην συνέχεια να επιλέξει ένα το οποίο έχει σώσει ώς draft κάνοντας το book (τύπου proceed to checkout) και αλλάζοντας το status του στην βάση ή μπορεί να δημιουργεί ένα και να το κάνει book εκείνη την στιγμή.
Ο partner user μπορεί απο μια φόρμα/dashboard να δημιουργεί ένα event συμπληρώνοντας με άνεση όλα τα απαραίτητα πεδία, προσθέτοντας το στην λίστα του, την οποία μπορεί ανα πάσα στιγμή να κάνει access και να αλλάξει το mode καποιου event σε posted και το αντίστροφο ή ακόμα και να το διαγράψει.
Όλα τα data που σχετίζονται με τα posts (εγγραφές με event-name, category, date, price, image-url, status) καθώς και με τις επιλογές των filters (extreme sport categories) αποθηκεύονται στην βάση (χρησιμοποιώντας το prisma ώς content managment software για τα Models του DB).