(function() {

    const agecalc = document.getElementById('agecalc')
    const inpbirthDate = document.getElementById('birth-date')
    const inpCurDate = document.getElementById('currently-date')
    const createDateBut = document.getElementById('create-date')
    const resetDateBut = document.getElementById('reset-calc')
    const wrapInputs = document.getElementById('wrap_inputs')

    if (document.querySelectorAll('#currently-date').length > 0) inpCurDate.value = new Date().toISOString().slice(0, 10)


    class Calc {

        calc() {
            throw new Error('Error...')
        }

        erroeDate(err) {
            if (wrapInputs.classList.contains('_error')) return
            const errorEl = document.createElement('div')
            errorEl.classList.add('errors')
            errorEl.insertAdjacentHTML('afterbegin', `<div class="error-text">${err}</div>`)
            wrapInputs.insertBefore(errorEl, createDateBut.parentNode)
            setTimeout(() => {
                errorEl.classList.add('active')
                wrapInputs.classList.add('_error')
                inpbirthDate.parentNode.classList.add('animate__headShake')
                inpCurDate.parentNode.classList.add('animate__headShake')
            }, 10)
            setTimeout(() => {
                errorEl.classList.remove('active')
                wrapInputs.classList.remove('_error')
                inpbirthDate.parentNode.classList.remove('animate__headShake')
                inpCurDate.parentNode.classList.remove('animate__headShake')
            }, 3500)

            return setTimeout(() => wrapInputs.removeChild(errorEl), 3600)
        }

        showe(values) {
            this.$calcValues = document.createElement('div')
            this.$calcValues.classList.add('calc-age__dlock-result')
            this.$calcValues.insertAdjacentHTML('afterbegin', `
						<div class="items-block">
						<div class="item-title">Ваш возраст:</div>
						<div class="items">
								<div class="item-result">
										<span class="item-result-number" id="yearsFromBirthday" >${values.yearsFromBirthday}</span>
										<span class="item-result-time">года.</span>
								</div>
								<div class="item-result">
										<span class="item-result-number" id="monthsFromBirthday">${values.monthsFromBirthday}</span>
										<span class="item-result-time">месяцы.</span>
								</div>
								<div class="item-result">
										<span class="item-result-number" id="daysFromBirthday">${values.daysFromBirthday}</span>
										<span class="item-result-time">дни.</span>
								</div>
						</div>
				</div>

				<div class="items-block">
						<div class="item-title">С дня рождения прошло:</div>
						<div class="items">
								<div class="item-result">
										<span class="item-result-number" id="allWeeks">${values.allWeeks}</span>
										<span class="item-result-time">недели.</span>
								</div>
								<div class="item-result">
										<span class="item-result-number" id="allDays">${values.allDays}</span>
										<span class="item-result-time">дни.</span>
								</div>
								<div class="item-result">
										<span class="item-result-number" id="allHours">${values.allHours}</span>
										<span class="item-result-time">часы.</span>
								</div>
								<div class="item-result">
										<span class="item-result-number" id="allMinuts">${values.allMinuts}</span>
										<span class="item-result-time">минуты.</span>
								</div>
								<div class="item-result">
										<span class="item-result-number" id="allSeconds">${values.allSeconds}</span>
										<span class="item-result-time">секунды.</span>
								</div>
						</div>
				</div>

				<div class="items-block">
						<div class="item-title">До дня рождения осталось:</div>
						<div class="items">
								<div class="item-result">
										<span class="item-result-number" id="daysToBirthday">${values.daysToBirthday}</span>
										<span class="item-result-time">дни.</span>
								</div>
						</div>

				</div>
						`)

            if (document.querySelectorAll('.calc-age__dlock-result').length > 0) {
                return (
                    document.getElementById('yearsFromBirthday').innerHTML = values.yearsFromBirthday,
                    document.getElementById('monthsFromBirthday').innerHTML = values.monthsFromBirthday,
                    document.getElementById('daysFromBirthday').innerHTML = values.daysFromBirthday,
                    document.getElementById('allWeeks').innerHTML = values.allWeeks,
                    document.getElementById('allDays').innerHTML = values.allDays,
                    document.getElementById('allHours').innerHTML = values.allHours,
                    document.getElementById('allMinuts').innerHTML = values.allMinuts,
                    document.getElementById('allSeconds').innerHTML = values.allSeconds,
                    document.getElementById('daysToBirthday').innerHTML = values.daysToBirthday
                )
            }

            resetDateBut.classList.add('active')
            resetDateBut.removeAttribute('disabled')

            agecalc.append(this.$calcValues)
            return setTimeout(() => this.$calcValues.classList.add('active'), 10)
        }

        remove(but) {
            but.classList.remove('active')
            but.setAttribute('disabled', 'true')
            let dateBloc = document.querySelector('.calc-age__dlock-result')
            dateBloc.classList.remove('active')
            return setTimeout(() => agecalc.removeChild(dateBloc), 300)
        }
    }


    class AgeCalculation extends Calc {
        constructor(date) {
            super()
            this.birth = date.birth
            this.curdate = date.currentlyDate
            this.ONE_DAY = 1000 * 60 * 60 * 24
        }

        getYears() {
            let dateFrom = +new Date(new Date(this.curdate).getFullYear(),
                new Date(this.birth).getMonth(), new Date(this.birth).getDate())

            // Если нету полных лет то показывать на год меньше
            if (dateFrom > +new Date(this.curdate)) return (this.curdate.getFullYear() - this.birth.getFullYear() - 1)

            return (this.curdate.getFullYear() - this.birth.getFullYear())
        }

        getMonths() {
            let monthsBefore = (new Date(this.curdate).getMonth() + 1) - (new Date(this.birth).getMonth() + 1)
            let monthsAfter = (12 - (new Date(this.birth).getMonth() + 1)) + (new Date(this.curdate).getMonth() + 1)

            if (new Date(this.curdate).getMonth() === new Date(this.birth).getMonth()) {
                if (new Date(this.curdate).getDate() < new Date(this.birth).getDate()) return 11
                return 0
            } else if (new Date(this.curdate).getMonth() > new Date(this.birth).getMonth()) {
                if (new Date(this.curdate).getDate() < new Date(this.birth).getDate()) return (monthsBefore - 1)
                return monthsBefore
            } else {
                if (new Date(this.curdate).getDate() < new Date(this.birth).getDate()) return (monthsAfter - 1)
                return monthsAfter
            }
        }

        getDays() {
            let currentDate = +new Date(this.curdate).getDate()
            let birthDay = +new Date(this.birth).getDate()
            let dayfromDate = new Date(+new Date(this.curdate).getFullYear(), +new Date(this.curdate).getMonth(), +new Date(this.birth).getDate())

            if (birthDay > currentDate) {
                dayfromDate = new Date(+new Date(this.curdate).getFullYear(), +new Date(this.curdate).getMonth() - 1, +new Date(this.birth).getDate())
                return Math.floor((+new Date(this.curdate) - +dayfromDate) / this.ONE_DAY)
            }

            return Math.floor((+new Date(this.curdate) - +dayfromDate) / this.ONE_DAY)
        }

        getAllWeeks() {
            const ONE_WEEK = 1000 * 60 * 60 * 24 * 7
            return Math.floor((+new Date(this.curdate) - +new Date(this.birth)) / ONE_WEEK)
        }

        getAllDays() {
            return Math.floor((+new Date(this.curdate) - +new Date(this.birth)) / this.ONE_DAY)
        }

        getAllHours() {
            const ONE_HOUR = 1000 * 60 * 60
            return Math.floor((+new Date(this.curdate) - +new Date(this.birth)) / ONE_HOUR)
        }

        getAllMinuts() {
            const ONE_MINUTE = 1000 * 60
            return Math.floor((+new Date(this.curdate) - +new Date(this.birth)) / ONE_MINUTE)
        }

        getAllSeconds() {
            return Math.floor((+new Date(this.curdate) - +new Date(this.birth)) / 1000)
        }

        getDaysToBirthday() {
            let dayToDate = +new Date(+new Date(this.curdate).getFullYear(), +new Date(this.birth).getMonth(), +new Date(this.birth).getDate())
            let daysFromDate = +new Date(+new Date(this.curdate).getFullYear(), +new Date(this.curdate).getMonth(), +new Date(this.curdate).getDate())

            if (dayToDate <= daysFromDate) {
                dayToDate = +new Date(+new Date(this.curdate).getFullYear() + 1, +new Date(this.birth).getMonth(), +new Date(this.birth).getDate())
                return Math.floor((dayToDate - daysFromDate) / this.ONE_DAY)
            }

            return (Math.floor((dayToDate - daysFromDate) / this.ONE_DAY))
        }
    }

    if (document.querySelectorAll('.calc-age-inputs__buttons').length > 0) {
        const age = new AgeCalculation({
            birth: new Date(inpbirthDate.value),
            currentlyDate: new Date(inpCurDate.value)
        })

        createDateBut.addEventListener('click', () => {

            if (+new Date(inpbirthDate.value) > +new Date(inpCurDate.value)) {
                Calc.prototype.erroeDate('Дата рождения не может быть позже текущей даты!')
                return false
            }
            age.birth = new Date(inpbirthDate.value)
            age.currentlyDate = new Date(inpCurDate.value)

            age.showe({
                daysToBirthday: age.getDaysToBirthday(),
                allSeconds: age.getAllSeconds(),
                allMinuts: age.getAllMinuts(),
                allHours: age.getAllHours(),
                allDays: age.getAllDays(),
                allWeeks: age.getAllWeeks(),
                daysFromBirthday: age.getDays(),
                monthsFromBirthday: age.getMonths(),
                yearsFromBirthday: age.getYears(),
                yearsFromBirthday: age.getYears()
            })

        })
        resetDateBut.addEventListener('click', (e) => age.remove(e.target))
    }

})()