const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');


@Entity('angestellte')
class Angestellte {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @Column()
  dampft;
}

module.exports = Angestellte;
