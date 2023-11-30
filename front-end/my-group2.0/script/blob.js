const animationType = 'headShake'
        const blob = document.getElementById('blob');
        const body = document.getElementsByTagName('body')[0];

        blob.addEventListener('mouseenter', () => {
            blob.classList.add(animationType);
        });

        blob.addEventListener('mouseleave', () => {
            blob.classList.remove(animationType);
        });

        const matchElementClassToCondition = (element, className, condition) => {
            element.classList[condition ? 'add' : 'remove'](className);
        }

        const applyBlobClassRules = (rules) => {
            rules.forEach(rule => {
                matchElementClassToCondition(blob, rule.className, rule.when);
            });
        };

        body.addEventListener('mousemove', (e) => {
            applyBlobClassRules([
                { className: 'look-up', when: e.clientY < 526 },
                { className: 'look-down', when: e.clientY > 526 },
                { className: 'look-left', when: e.clientX < 495 },
                { className: 'look-right', when: e.clientX > 495 }
            ]);
        });