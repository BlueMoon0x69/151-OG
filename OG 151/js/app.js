            let filterActive = false;

            // Charger au démarrage
            
            
            
            // Sauvegarder les cartes ajoutées
            function saveAddedCards() {
                try {
                    const cardsGrid = document.querySelector('.cards-grid');
                    const allCards = Array.from(cardsGrid.querySelectorAll('.card-item'));
                    const addedCards = [];
                    
                    // Récupérer le HTML de chaque carte
                    allCards.forEach(card => {
                        const cardName = card.querySelector('.card-name');
                        if (cardName) {
                            const cardData = {
                                html: card.outerHTML,
                                name: cardName.textContent.trim(),
                                id: cardName.id
                            };
                            addedCards.push(cardData);
                        }
                    });
                    
                    localStorage.setItem('pokemon_added_cards', JSON.stringify(addedCards));
                    console.log('Cartes sauvegardées:', addedCards.length);
                } catch (e) {
                    console.error('Erreur sauvegarde cartes:', e);
                }
            }

            // Charger les cartes ajoutées au démarrage
            function loadAddedCards() {
                try {
                    const saved = localStorage.getItem('pokemon_added_cards');
                    if (saved) {
                        const addedCards = JSON.parse(saved);
                        const cardsGrid = document.querySelector('.cards-grid');
                        
                        // Vider la grille
                        cardsGrid.innerHTML = '';
                        
                        // Réinsérer toutes les cartes
                        addedCards.forEach(cardData => {
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = cardData.html;
                            cardsGrid.appendChild(tempDiv.firstChild);
                        });
                        
                        console.log('Cartes chargées:', addedCards.length);
                    }
                } catch (e) {
                    console.error('Erreur chargement cartes:', e);
                }
            }

            // Ordre Pokédex (numéro national)
            const pokedexOrder = {
                'Bulbizarre': 1, 'Herbizarre': 2, 'Florizarre': 3,
                'Salamèche': 4, 'Reptincel': 5, 'Dracaufeu': 6,
                'Carapuce': 7, 'Carabaffe': 8, 'Tortank': 9,
                'Chenipan': 10, 'Roucool': 12, 'Roucoups': 17, 'Roucarnage': 18,
                'Pikachu': 25, 'Raichu': 26,
                'Nidoking': 34,
                'Mélofée': 35,
                'Goupix': 37, 'Feunard': 38,
                'Rondoudou': 39, 'Grodoudou': 40,
                'Psykokwak': 54, 'Têtarte': 62,
                'Abo': 23, 'Arbok': 24,
                'Machopeur': 67, 'Mackogneur': 68,
                'Tentacool': 72,
                'Galopa': 78,
                'Spectrum': 93,
                'Noadkoko': 103,
                'Magicarpe': 129, 'Ronflex': 143,
                'Dardargnan': 15,
                'Piafabec': 21,
                'Miaouss': 52,
                'Saquedeneu': 114,
                'M. Mime': 122,
                'Kangourex': 115,
                'Méga-Kangourex': 115,
                'Lokhlass': 131,
                'Lamantine': 87,
                'Électhor': 145,
                'Draco': 147,
                'Mew': 151,
                'Pyroli': 136,
                'Amonita': 138,
                'Parasect': 47,
                'Alakazam': 65,
                'Rattatac': 20,
                'Triopikeur': 51
            };

            
            // Recherche simple
            function filterCards() {
                const searchValue = document.getElementById('searchBox').value.toLowerCase().trim();
                const cards = document.querySelectorAll('.card-item');
                
                cards.forEach(card => {
                    const cardName = card.querySelector('.card-name').textContent.toLowerCase();
                    
                    if (searchValue === '' || cardName.includes(searchValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            let currentSortMode = 'alphabet'; // 'alphabet' ou 'pokedex'

            // Tri alphabétique
            function sortCardsAlphabetically() {
                const cardsGrid = document.querySelector('.cards-grid');
                const cards = Array.from(document.querySelectorAll('.card-item'));
                
                cards.sort((a, b) => {
                    const nameA = a.querySelector('.card-name').textContent.trim().toLowerCase();
                    const nameB = b.querySelector('.card-name').textContent.trim().toLowerCase();
                    return nameA.localeCompare(nameB, 'fr');
                });
                
                cards.forEach(card => cardsGrid.appendChild(card));
                console.log('Tri alphabétique');
            }

            // Tri Pokédex
            function sortCardsByPokedex() {
                const cardsGrid = document.querySelector('.cards-grid');
                const cards = Array.from(document.querySelectorAll('.card-item'));
                
                cards.sort((a, b) => {
                    const nameA = a.querySelector('.card-name').textContent.trim().split(' ')[0];
                    const nameB = b.querySelector('.card-name').textContent.trim().split(' ')[0];
                    
                    const numA = pokedexOrder[nameA] || 999;
                    const numB = pokedexOrder[nameB] || 999;
                    
                    return numA - numB;
                });
                
                cards.forEach(card => cardsGrid.appendChild(card));
                console.log('Tri Pokédex');
            }

            // Basculer entre les modes de tri
            function toggleSort() {
                const btn = document.getElementById('sortBtn');
                
                if (currentSortMode === 'alphabet') {
                    currentSortMode = 'pokedex';
                    sortCardsByPokedex();
                    btn.innerHTML = '🔤 Ordre alphabétique';
                } else {
                    currentSortMode = 'alphabet';
                    sortCardsAlphabetically();
                    btn.innerHTML = '🔢 Ordre Pokédex';
                }
            }

            // Trier au chargement
            document.addEventListener('DOMContentLoaded', function() {
                loadAddedCards();  // Charger les cartes sauvegardées
                sortCardsAlphabetically();
                loadOwnedState();
                updateCounter();
            });



            // Charger l'état
            function loadOwnedState() {
                try {
                    const owned = JSON.parse(localStorage.getItem('pokemon_owned_cards') || '{}');
                    const cards = document.querySelectorAll('.card-item');
                    
                    cards.forEach((card, index) => {
                        const checkbox = card.querySelector('.owned-checkbox-top');
                        if (checkbox && owned[index]) {
                            checkbox.classList.add('checked');
                            checkbox.textContent = '✓';
                        }
                    });
                } catch (e) {
                    console.error('Erreur chargement:', e);
                }
            }

            // Sauvegarder l'état
            function saveOwnedState() {
                try {
                    const owned = {};
                    const cards = document.querySelectorAll('.card-item');
                    
                    cards.forEach((card, index) => {
                        const checkbox = card.querySelector('.owned-checkbox-top');
                        if (checkbox && checkbox.classList.contains('checked')) {
                            owned[index] = true;
                        }
                    });
                    
                    localStorage.setItem('pokemon_owned_cards', JSON.stringify(owned));
                } catch (e) {
                    console.error('Erreur sauvegarde:', e);
                }
            }

            // Toggle carte possédée
            function toggleOwned(event, checkbox) {
                event.stopPropagation();
                console.log('Checkbox cliquée!');
                
                if (checkbox.classList.contains('checked')) {
                    checkbox.classList.remove('checked');
                    checkbox.textContent = '';
                } else {
                    checkbox.classList.add('checked');
                    checkbox.textContent = '✓';
                }
                
                saveOwnedState();
                updateCounter();
                
                if (filterActive) {
                    applyFilter();
                }
            }

            // Mettre à jour le compteur
            function updateCounter() {
                const cards = document.querySelectorAll('.card-item');
                const owned = document.querySelectorAll('.owned-checkbox-top.checked').length;
                const total = cards.length;
                const missing = total - owned;
                
                const ownedSpan = document.querySelector('.counter .owned');
                const totalSpan = document.querySelector('.counter span:nth-child(3)');
                const missingSpan = document.querySelector('.counter .missing');
                
                if (ownedSpan) ownedSpan.textContent = owned;
                if (totalSpan) totalSpan.textContent = total;
                if (missingSpan) missingSpan.textContent = missing;
            }

            // Toggle filtre
            function toggleFilter() {
                filterActive = !filterActive;
                const btn = document.getElementById('filterBtn');
                
                if (filterActive) {
                    btn.classList.add('active');
                    btn.innerHTML = '🔄 Afficher toutes les cartes';
                    applyFilter();
                } else {
                    btn.classList.remove('active');
                    btn.innerHTML = '🔍 Afficher uniquement les cartes manquantes';
                    showAllCards();
                }
            }

            // Appliquer le filtre
            function applyFilter() {
                const cards = document.querySelectorAll('.card-item');
                cards.forEach(card => {
                    const checkbox = card.querySelector('.owned-checkbox-top');
                    if (checkbox && checkbox.classList.contains('checked')) {
                        card.style.display = 'none';
                    } else {
                        card.style.display = 'block';
                    }
                });
            }

            // Afficher toutes les cartes
            function showAllCards() {
                const cards = document.querySelectorAll('.card-item');
                cards.forEach(card => {
                    card.style.display = 'block';
                });
            }

            // Lightbox
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('zoom-icon') || e.target.classList.contains('card-image')) {
                    const card = e.target.closest('.card-item');
                    const img = card.querySelector('.card-image');
                    const modal = document.getElementById('modal');
                    const modalImg = document.getElementById('modal-img');
                    if (modal && modalImg) {
                        modal.style.display = 'flex';
                        modalImg.src = img.src;
                    }
                }
                if (e.target.id === 'modal' || e.target.classList.contains('close')) {
                    const modal = document.getElementById('modal');
                    if (modal) modal.style.display = 'none';
                }
            });

            // Formulaire
            function toggleAddCardForm() {
                const section = document.getElementById('addCardSection');
                const btn = document.getElementById('toggleFormBtn');
                if (section.classList.contains('form-hidden')) {
                    section.classList.remove('form-hidden');
                    btn.textContent = '❌ Fermer le formulaire';
                } else {
                    section.classList.add('form-hidden');
                    btn.textContent = '➕ Ajouter une nouvelle carte';
                }
            }

            function addNewCard(event) {
                event.preventDefault();
                
                const name = document.getElementById('cardName').value;
                const number = document.getElementById('cardNumber').value;
                const set = document.getElementById('cardSet').value;
                const price = document.getElementById('cardPrice').value;
                const rarity = document.getElementById('cardRarity').value;
                const link = document.getElementById('cardLink').value;
                let imageUrl = document.getElementById('cardImageUrl').value;
                
                if (!imageUrl) {
                    const setMatch = link.match(/Singles\/([^\/]+)\//);
                    const cardNum = number.split('/')[0].padStart(3, '0');
                    
                    if (setMatch) {
                        const setCode = setMatch[1];
                        const mapping = {
                            '151': 'MEW', 'Temporal-Forces': 'TEF', 'Phantasmal-Flames': 'PFL',
                            'Mega-Evolution': 'MEG', 'Destined-Rivals': 'DRI', 'Ascended-Heroes': 'ASC',
                            'Lost-Origin': 'LORTG', 'MEP-Black-Star-Promos': 'MEP'
                        };
                        const code = mapping[setCode] || setCode.toUpperCase();
                        imageUrl = "https://pokecardex.b-cdn.net/assets/images/sets/" + code + "/HD/" + cardNum + ".jpg";
                    }
                }
                
                const existingBtn = document.querySelector('.cardmarket-btn img');
                const logoSrc = existingBtn ? existingBtn.src : '';
                const cardId = 'card-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                
                const cardHTML = '<div class="card-item"><div class="card-visual"><div class="owned-checkbox-top" onclick="toggleOwned(event, this)"></div><img src="' + imageUrl + '" alt="' + name + '" class="card-image"></div><div class="card-info"><div class="card-name" id="' + cardId + '">' + name + '</div><div class="card-number">' + number + '</div><div style="font-size: 0.85em; color: #95a5a6; margin-top: 3px;">📦 ' + set + '</div><div style="margin-top: 8px;"><span class="rarity-badge ir">' + rarity + '</span><span style="margin-left: 5px;">⭐⭐⭐</span></div><div style="margin-top: 8px;"><span class="price" style="color: #ff6a00; font-weight: bold;">' + price + ' € <span style="display: inline-flex; align-items: center; justify-content: center; background: #10b981; color: white; padding: 2px 5px; border-radius: 2px; font-size: 0.6em; margin-left: 4px; font-weight: 600; height: 13px;">NM</span> <span style="display: inline-flex; width: 14px; height: 10px; margin-left: 3px; border-radius: 2px; overflow: hidden;"><span style="flex: 1; background: #0055A4;"></span><span style="flex: 1; background: white;"></span><span style="flex: 1; background: #EF4135;"></span></span></span></div><div class="zoom-icon">🔎</div><a href="' + link + '" target="_blank" class="cardmarket-btn"><img src="' + logoSrc + '" alt="Cardmarket"></a></div></div>';
                
                const cardsGrid = document.querySelector('.cards-grid');
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = cardHTML.trim();
                cardsGrid.appendChild(tempDiv.firstChild);
                
                document.getElementById('addCardForm').reset();
                toggleAddCardForm();
                
                if (currentSortMode === 'alphabet') {
                    sortCardsAlphabetically();
                } else {
                    sortCardsByPokedex();
                }
                
                updateCounter();
                saveAddedCards();  // Sauvegarder toutes les cartes
                alert('✅ ' + name + ' ajoutée et sauvegardée !');
                
                setTimeout(function() {
                    const addedCard = document.getElementById(cardId);
                    if (addedCard) {
                        addedCard.closest('.card-item').scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 300);
            }



            // Gestion du lightbox
            document.addEventListener('DOMContentLoaded', function() {
                // Ajouter les événements sur toutes les loupes
                const zoomIcons = document.querySelectorAll('.zoom-icon');
                zoomIcons.forEach(icon => {
                    icon.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const cardItem = this.closest('.card-item');
                        const imgSrc = cardItem.querySelector('.card-image').src;
                        
                        const lightbox = document.getElementById('lightbox');
                        const lightboxImg = document.getElementById('lightbox-img');
                        lightboxImg.src = imgSrc;
                        lightbox.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    });
                });
                
                // Fermer le lightbox
                const lightbox = document.getElementById('lightbox');
                lightbox.addEventListener('click', function(e) {
                    if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
                        this.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                });
                
                // Fermer avec Echap
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        lightbox.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                });
            });
