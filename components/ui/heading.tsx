interface Props{
    title: String,
    description?: String
}

const Heading: React.FC<Props>  = ({
    title,
    description
  }) => {
    return ( 
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    );
  };

  export default Heading